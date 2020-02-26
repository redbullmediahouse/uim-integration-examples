package examples;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

public class UimIntegrationUtils {
    private String appId;
    private String apiKey;
    private String environment;

    public UimIntegrationUtils(String appId, String apiKey, String environment) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.environment = environment;
    }

    public void sendSignedRequest(String method, String requestPath, String query, String body) throws Exception {
        String acceptHeader = "application/vnd.rb.uim-v1+json";
        String date = currentDatetime();
        String base64Body = Base64.getEncoder().encodeToString(body.getBytes());
        String signature = createSignature(method, requestPath, query, acceptHeader, base64Body, date);
        String url = uimUrl(requestPath);
        if(query != null && !query.isEmpty()) {
            url += "?" + query;
        }
        callUim(method, body, signature, url, acceptHeader, date);
    }

    private String createSignature(String requestMethod, String requestPath, String query, String acceptHeader, String body, String date) {
        String[] params = {appId, requestMethod, requestPath, query, acceptHeader, body, date};
        String rawSignature = String.join("\n", params);

        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(apiKey.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            String hash = Base64.getEncoder().encodeToString(sha256_HMAC.doFinal(rawSignature.getBytes()));
            return hash;
        }
        catch (Exception e){
            System.err.println("Error");
        }
        return "";
    }

    private String uimUrl(String requestPath) {
        String baseUrl;
        if (environment.equals("design")) {
            baseUrl = "https://uim-design.redbull.com/uim";
        } else if (environment.equals("production")) {
            baseUrl = "https://uim.redbull.com/uim";
        } else {
            throw new Error("Unknown environment " + environment);
        }
        return baseUrl + requestPath;
    }

    private String createHmac(String signature) {
        String hmacSignature = "HMAC " + appId + ":" + signature;
        System.out.println("AppId: " + appId + "\n");
        System.out.println("Signature: " + hmacSignature + "\n");
        return hmacSignature;
    }

    private void callUim(String method, String body, String signature, String url, String acceptHeader, String date) throws Exception {
        String hmacSignature = createHmac(signature);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json; charset=utf-8")
                .header("Accept", acceptHeader)
                .header("UIM-Date", date)
                .header("Authorization", hmacSignature)
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }

    private String currentDatetime() {
        return ZonedDateTime.now(ZoneId.of("GMT")).format(DateTimeFormatter.RFC_1123_DATE_TIME);
    }
}
