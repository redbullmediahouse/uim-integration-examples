using System;
using System.IO;
using System.Net;
using Utils;

namespace UimExamples
{
    class GetFormSubmission
    {
        public void getFormSubmission(string formSubmissionId, string formAlias, string apiKey, string environment)
        {
            UimIntegrationUtils utils = new UimIntegrationUtils(formAlias, apiKey, environment);
            try
            {
                string formSubmission = utils.sendSignedRequest("GET", "/client/applications/" + formAlias + "/form-submissions/" + formSubmissionId, null, null, true);
                Console.WriteLine(formSubmission);
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
