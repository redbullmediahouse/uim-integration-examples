package examples;

import org.json.JSONArray;
import org.json.JSONObject;

public class UimCreateUser {
    String appId;
    String appKey;
    String environment;

    public UimCreateUser(String appId, String appKey, String environment) {
        this.appId = appId;
        this.appKey = appKey;
        this.environment = environment;
    }

    public void submit() {
        try {
            UimIntegrationUtils utils = new UimIntegrationUtils(
                    appId,
                    appKey,
                    environment
            );
            JSONObject body = new JSONObject();
            JSONObject profileFields = new JSONObject();
            profileFields.put("email", "t.mueller@example.com");
            profileFields.put("first_name", "Toro");
            profileFields.put("last_name", "Mueller");
            profileFields.put("country", "ES");
            body.put("profileFields", profileFields);
            body.put("applicationId", appId);
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
            utils.sendSignedRequest("POST", "/client/applications/" + appId + "/users", "", body.toString());
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
