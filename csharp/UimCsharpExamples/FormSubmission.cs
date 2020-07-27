using System;
using Utils;

namespace UimExamples {
    class FormSubmission {
        public void submitForm(string formAlias, string appId, string apiKey, string environment) {
            var submission = "{\n" +
                "    \"formAlias\": \"" + formAlias + "\",\n" +
                "    \"language\": \"hr\",\n" +
                "    \"country\": \"HR\",\n" +
                "    \"source\": \"sinkovizacija\",\n" +
                "    \"skipVerification\": \"true\",\n" +
                "    \"fields\": {\n" +
                "         \"email\": \"test@example.com\",\n" +
                "         \"first_name\":\"Max\",\n" +
                "         \"last_name\":\"Mustermann\",\n" +
                "         \"birthdate\":\"1990-01-01\",\n" +
                "         \"gender\":\"MALE\",\n" +
                "         \"address\":\"Dreamstreet 12\",\n" +
                "         \"city\":\"Heaven\",\n" +
                "         \"state\":\"Pangaea\",\n" +
                "         \"country\":\"AT\",\n" +
                "         \"school\":\"University of Heaven\"\n" +
                "     },\n" +
                "     \n" +
                "    \"policyTypes\": [\n" +
                "        \"privacy\"\n" +
                "    ]\n" +
                "}";

            UimIntegrationUtils utils = new UimIntegrationUtils(appId, apiKey, environment);
            try {
                string response = utils.sendSignedRequest("POST", "/client/applications/" + appId + "/form-submissions", null, submission);
                Console.WriteLine(response);
            } catch (Exception e) {
                Console.WriteLine("An error occurred: " + e);
            }
        }
    }
}
