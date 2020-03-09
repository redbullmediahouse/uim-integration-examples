package examples;

import org.json.JSONArray;
import org.json.JSONObject;

public class UimCreateUser {
    String app_id;
    String api_key;
    String environment;

    public UimCreateUser(String app_id, String api_key, String environment) {
        this.app_id = app_id;
        this.api_key = api_key;
        this.environment = environment;
    }

    public void submit() {
        try {
            UimIntegrationUtils utils = new UimIntegrationUtils(
                    app_id,
                    api_key,
                    environment
            );
            JSONObject body = new JSONObject();
            JSONObject profileFields = new JSONObject();
            profileFields.put("email", "t.mueller@example.com");
            body.put("profileFields", profileFields);
            body.put("applicationId", app_id);
            body.put("country", "UK");
            body.put("targetUrl", "https://redbull.com");
            body.put("password", "somehash");
            body.put("language", "en");
            JSONObject acceptedPolicies = new JSONObject();
            JSONObject registrationItems = utils.getRegistrationItems();
            JSONArray policies = (JSONArray) registrationItems.get("policies");
            policies.forEach(policy -> {
                JSONObject castPolicy = (JSONObject) policy;
                acceptedPolicies.put((String) castPolicy.get("id"), true);
            });
            body.put("policies", acceptedPolicies);
            body.put("source", "US_MY-ACTIVATION_02-20");
            utils.sendSignedRequest("POST", "/client/applications/" + app_id + "/users", "", body.toString());
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
