package examples;

public class UimJavaExample {
    public static void main(String[] args) {
        String appId = System.getenv("APP_ID");
        String appKey = System.getenv("API_KEY");
        String formAlias = System.getenv("FORM_ALIAS");
        String environment = System.getenv("ENVIRONMENT");

        if (args.length == 1) {
            if (args[0].equals("form-submission")) {
                UimFormSubmission uimFormSubmission = new UimFormSubmission(appId, appKey, formAlias, environment);
                uimFormSubmission.submit();
            } else if (args[0].equals("create-user")) {
                UimCreateUser uimCreateUser = new UimCreateUser(appId, appKey, environment);
                uimCreateUser.submit();
            } else if (args[0].equals("custom-notification-verification")) {
                UimCustomNotificationVerification uimCustomNotificationVerification = new UimCustomNotificationVerification();
                uimCustomNotificationVerification.verify();
            } else if (args[0].equals("find-user")) {
                UimFindUser uimFindUser = new UimFindUser(appId, appKey, environment);
                uimFindUser.findUser();
            } else {
                throw new Error("Unknown command " + args[0]);
            }
        } else {
            throw new Error("Missing command please check out README.md!");
        }
    }
}
