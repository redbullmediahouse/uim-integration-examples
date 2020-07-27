using System;
using UimExamples;

class UimCsharpExamples
{
    static void Main()
    {
        string example = Environment.GetEnvironmentVariable("EXAMPLE");
        string siloUserId = Environment.GetEnvironmentVariable("SILO_USER_ID");
        string appId = Environment.GetEnvironmentVariable("APP_ID");
        string apiKey = Environment.GetEnvironmentVariable("API_KEY");
        string formAlias = Environment.GetEnvironmentVariable("FORM_ALIAS");
        string environment = Environment.GetEnvironmentVariable("ENVIRONMENT");

        if (example.Equals("form-submission"))
        {
            var formSubmission = new FormSubmission();
            formSubmission.submitForm(formAlias, appId, apiKey, environment);
        }
        else if (example.Equals("find-user"))
        {
            var findUser = new FindUser();
            findUser.findUser(siloUserId, appId, apiKey, environment);
        }
    }
}