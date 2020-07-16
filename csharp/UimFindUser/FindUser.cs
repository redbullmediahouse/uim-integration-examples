using System;
using Utils;

namespace UimFindUser {
    class FindUser {

        public void findUser(string siloUserId, string appId, string apiKey, string environment) {
            UimIntegrationUtils utils = new UimIntegrationUtils(appId, apiKey, environment);
            try {
                string findQueryParameters = "siloUserId=" + siloUserId + "&field=email&field=first_name&field=last_name&field=country";
                string user = utils.sendSignedRequest("GET", "/client/applications/" + appId + "/users", findQueryParameters, null);
                Console.WriteLine("user = " + user);
            } catch (Exception e) {
                Console.WriteLine("An error occurred: " + e);
            }
        }
    }

    class Test {
        static void Main() {
            var program = new FindUser();
            string siloUserId = Environment.GetEnvironmentVariable("SILO_USER_ID");
            string appId = Environment.GetEnvironmentVariable("APP_ID");
            string apiKey = Environment.GetEnvironmentVariable("API_KEY");
            string environment = Environment.GetEnvironmentVariable("ENVIRONMENT");
            program.findUser(siloUserId, appId, apiKey, environment);
        }
    }
}
