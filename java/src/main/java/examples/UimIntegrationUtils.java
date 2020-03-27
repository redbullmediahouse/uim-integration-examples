package examples;

import org.json.JSONObject;

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
    private String clientIdentifier;
    private String apiKey;
    private String environment;

    public UimIntegrationUtils(String clientIdentifier, String apiKey, String environment) {
        this.clientIdentifier = clientIdentifier;
        this.apiKey = apiKey;
        this.environment = environment;
    }

    public String sendSignedRequest(String method, String requestPath, String query, String body) throws Exception {
        return sendSignedRequest(method, requestPath, query, body, false);
    }

    public String sendSignedRequest(String method, String requestPath, String query, String body, boolean useFormAuth) throws Exception {
        String acceptHeader = "application/vnd.rb.uim-v1+json";
        String date = currentDatetime();
        String base64Body = body != null ? Base64.getEncoder().encodeToString(body.getBytes()): "";
        String signature = createSignature(method, requestPath, query, acceptHeader, base64Body, date);
        String url = uimUrl(requestPath);
        if(query != null && !query.isEmpty()) {
            url += "?" + query;
        }
        return callUim(method, body, signature, url, acceptHeader, date, useFormAuth);
    }

    private String createSignature(String requestMethod, String requestPath, String query, String acceptHeader, String body, String date) {
        String[] params = {clientIdentifier, requestMethod, requestPath, query, acceptHeader, body, date};
        String rawSignature = String.join("\n", params);

        try {
            Mac sha256HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(apiKey.getBytes(), "HmacSHA256");
            sha256HMAC.init(secretKey);

            String hash = Base64.getEncoder().encodeToString(sha256HMAC.doFinal(rawSignature.getBytes()));
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
        } else if (environment.equals("local")) {
            baseUrl = "http://localhost:8090";
        } else {
            throw new Error("Unknown environment " + environment);
        }
        return baseUrl + requestPath;
    }

    private String createHmac(String signature, boolean useFormAuth) {
        String prefix = useFormAuth ? "FORM:" : "";
        String hmacSignature = "HMAC " + prefix + clientIdentifier + ":" + signature;
        System.out.println("Client: " + clientIdentifier + "\n");
        System.out.println("Signature: " + hmacSignature + "\n");
        return hmacSignature;
    }

    private String callUim(String method, String body, String signature, String url, String acceptHeader, String date, boolean useFormAuth) throws Exception {
        String hmacSignature = createHmac(signature, useFormAuth);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json; charset=utf-8")
                .header("Accept", acceptHeader)
                .header("UIM-Date", date)
                .header("Authorization", hmacSignature);
        if ("POST".equals(method)) {
            requestBuilder = requestBuilder.POST(HttpRequest.BodyPublishers.ofString(body));
        } else if ("GET".equals(method)) {
            requestBuilder = requestBuilder.GET();
        }
        HttpResponse<String> response = client.send(requestBuilder.build(),
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
        return response.body();
    }

    private String currentDatetime() {
        return ZonedDateTime.now(ZoneId.of("GMT")).format(DateTimeFormatter.RFC_1123_DATE_TIME);
    }

    public JSONObject getRegistrationItems() throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uimUrl("/api/application/registration-items")))
                .header("Application-Id", clientIdentifier)
                .header("Accept", "application/vnd.rb.uim-v16+json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        JSONObject registrationItems = new JSONObject(response.body());
        return registrationItems;
    }
}
