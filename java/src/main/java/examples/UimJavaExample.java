package examples;

public class UimJavaExample {
    public static void main(String[] args) {
        String app_id = System.getenv("APP_ID");
        String api_key = System.getenv("API_KEY");
        String form_alias = System.getenv("FORM_ALIAS");
        String environment = System.getenv("ENVIRONMENT");

        if (args[0] != null) {
            if (args[0].equals("form-submission")) {
                UimFormSubmission uimFormSubmission = new UimFormSubmission(app_id, api_key, form_alias, environment);
                uimFormSubmission.submit();
            } else if (args[0].equals("create-user")) {
                UimCreateUser uimCreateUser = new UimCreateUser(app_id, api_key, environment);
                uimCreateUser.submit();
            } else if (args[0].equals("custom-notification-verification")) {
                UimCustomNotificationVerification uimCustomNotificationVerification = new UimCustomNotificationVerification();
                uimCustomNotificationVerification.verify();

            } else {
                throw new Error("Unknown command " + args[0]);
            }
        } else {
            throw new Error("Missing command please check out README.md!");
        }
    }
}
