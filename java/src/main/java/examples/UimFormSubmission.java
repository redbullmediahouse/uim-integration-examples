package examples;

import org.json.JSONArray;
import org.json.JSONObject;

public class UimFormSubmission {
    String appId;
    String appKey;
    String environment;
    String formAlias;

    public UimFormSubmission(String appId, String appKey, String formAlias, String environment) {
        this.appId = appId;
        this.appKey = appKey;
        this.environment = environment;
        this.formAlias = formAlias;
    }

    public void submit() {
        JSONObject body = new JSONObject();
        JSONObject fields = new JSONObject();
        fields.put("first_name", "Jane");
        fields.put("last_name", "Elliott");
        fields.put("email", "youremail@yourDomain.com");
        fields.put("gender", "FEMALE");
        fields.put("city", "Barcelona");
        fields.put("country", "ES");
        fields.put("zip_code", "12345");
        body.put("fields", fields);
        body.put("formAlias", formAlias);
        body.put("language", "en");
        body.put("country", "US");
        JSONArray policyTypes = new JSONArray("[\"privacy\"]");
        body.put("policyTypes", policyTypes);
        body.put("newsletterAccepted", true);
        body.put("source", "US_MY-ACTIVATION_02-20");

        UimIntegrationUtils utils = new UimIntegrationUtils(
                appId,
                appKey,
                environment
        );
        try {
            utils.sendSignedRequest("POST", "/client/applications/" + appId + "/form-submissions", "", body.toString());
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
