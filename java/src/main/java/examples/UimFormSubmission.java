package examples;

import org.json.JSONArray;
import org.json.JSONObject;

public class UimFormSubmission {
    String app_id;
    String api_key;
    String environment;
    String form_alias;

    public UimFormSubmission(String app_id, String api_key, String form_alias, String environment) {
        this.app_id = app_id;
        this.api_key = api_key;
        this.environment = environment;
        this.form_alias = form_alias;
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
        body.put("formAlias", form_alias);
        body.put("language", "en");
        body.put("country", "US");
        JSONArray policyTypes = new JSONArray("[\"privacy\"]");
        body.put("policyTypes", policyTypes);
        body.put("newsletterAccepted", true);
        body.put("source", "US_MY-ACTIVATION_02-20");

        UimIntegrationUtils utils = new UimIntegrationUtils(
                app_id,
                api_key,
                environment
        );
        try {
            utils.sendSignedRequest("POST", "/client/applications/" + app_id + "/form-submissions", "", body.toString());
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
