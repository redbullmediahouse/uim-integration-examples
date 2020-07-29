using System;
using System.Linq;
using System.IO;
using System.Net;
using Newtonsoft.Json.Linq;
using Utils;

namespace UimExamples
{
    class CreateUser
    {
        public void createUser(string appId, string apiKey, string environment)
        {
            UimIntegrationUtils utils = new UimIntegrationUtils(appId, apiKey, environment);

            var registrationItemsJson = utils.getRegistrationItems(appId);

            JObject registrationItems = JObject.Parse(registrationItemsJson);
            var policyIds = registrationItems["policies"].Children()["id"].ToArray();
            string acceptedIds = "";
            for (int i = 0; i < policyIds.Count(); i++)
            {
                acceptedIds += "\"" + policyIds[i] + "\":true";
                if (i < policyIds.Count() - 1)
                {
                    acceptedIds += ",";
                }
                acceptedIds += "\n";
            }

            var registrationData = "{\n" +
                "    \"applicationId\": \"" + appId + "\",\n" +
                "    \"password\": \"password\",\n" +
                "    \"language\": \"en\",\n" +
                "    \"country\": \"DE\",\n" +
                "    \"profileFields\": {\n" +
                "         \"email\": \"test@example.com\",\n" +
                "         \"first_name\":\"Max\",\n" +
                "         \"last_name\":\"Mustermann\",\n" +
                "         \"country\":\"AT\"\n" +
                "     },\n" +
                "    \"policies\": {\n" +
                            acceptedIds +
                "    }\n" +
                "}";

            try
            {
                string response = utils.sendSignedRequest("POST", "/client/applications/" + appId + "/users", null, registrationData);
                Console.WriteLine(response);
            }
            catch (WebException e)
            {
                using (StreamReader r = new StreamReader(e.Response.GetResponseStream()))
                {
                    string response = r.ReadToEnd();
                    Console.WriteLine(response);
                }
            }
        }
    }
}
