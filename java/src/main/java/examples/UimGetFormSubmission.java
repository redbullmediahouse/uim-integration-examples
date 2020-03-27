package examples;

public class UimGetFormSubmission {
    String formAlias;
    String apiKey;
    String environment;

    public UimGetFormSubmission(String formAlias, String apiKey, String environment) {
        this.formAlias = formAlias;
        this.apiKey = apiKey;
        this.environment = environment;
    }

    public void getFormSubmission() {
        UimIntegrationUtils utils = new UimIntegrationUtils(
                formAlias,
                apiKey,
                environment
        );
        try {
            String formSubmissionId = "5e7b2f4324a6b105ca25e909";
            String formSubmission = utils.sendSignedRequest("GET", "/client/applications/" + formAlias + "/form-submissions/" + formSubmissionId, "", null, true);
            System.out.println(formSubmission);
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
