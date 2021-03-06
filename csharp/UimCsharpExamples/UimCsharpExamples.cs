using System;
using UimExamples;

class UimCsharpExamples
{
    static void Main()
    {
        string example = Environment.GetEnvironmentVariable("EXAMPLE");
        string siloUserId = Environment.GetEnvironmentVariable("SILO_USER_ID");
        string formSubmissionId = Environment.GetEnvironmentVariable("FORM_SUBMISSION_ID");
        string appId = Environment.GetEnvironmentVariable("APP_ID");
        string apiKey = Environment.GetEnvironmentVariable("API_KEY");
        string formAlias = Environment.GetEnvironmentVariable("FORM_ALIAS");
        string environment = Environment.GetEnvironmentVariable("ENVIRONMENT");

        if (example == null) {
            Console.WriteLine("No Environment Variable or parameter EXAMPLE");
            Console.WriteLine("Add -e 'EXAMPLE=<EXAMPLE_YOU_WANT_TO_RUN>'");
            Environment.Exit(-1);
        }
        else if (example.Equals("form-submission"))
        {
            var formSubmission = new FormSubmission();
            formSubmission.submitForm(formAlias, appId, apiKey, environment);
        }
        else if (example.Equals("create-user"))
        {
            var createUser = new CreateUser();
            createUser.createUser(appId, apiKey, environment);
        }
        else if (example.Equals("custom-notification-verification"))
        {
            var uimCustomNotificationVerification = new UimCustomNotificationVerification();
            uimCustomNotificationVerification.verify();
        }
        else if (example.Equals("find-user"))
        {
            var findUser = new FindUser();
            findUser.findUser(siloUserId, appId, apiKey, environment);
        }
        else if (example.Equals("get-form-submission"))
        {
            var getFormSubmission = new GetFormSubmission();
            getFormSubmission.getFormSubmission(formSubmissionId, formAlias, apiKey, environment);
        }
    }
}
