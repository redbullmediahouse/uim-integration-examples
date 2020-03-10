package examples;

public class UimFindUser {
    String appId;
    String apiKey;
    String environment;

    public UimFindUser(String appId, String apiKey, String environment) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.environment = environment;
    }

    public void findUser() {
        UimIntegrationUtils utils = new UimIntegrationUtils(
                appId,
                apiKey,
                environment
        );
        try {
            String siloUserId = "5e673b25cea34605ab0dbb97";
            String findQueryParameters = "siloUserId=" + siloUserId + "&field=email&field=first_name&field=last_name&field=country";
            String user = utils.sendSignedRequest("GET", "/client/applications/" + appId + "/users", findQueryParameters, null);
            System.out.println(user);
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
