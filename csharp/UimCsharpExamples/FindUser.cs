﻿using System;
using System.IO;
using System.Net;
using Utils;

namespace UimExamples {
    class FindUser {

        public void findUser(string siloUserId, string appId, string apiKey, string environment) {
            UimIntegrationUtils utils = new UimIntegrationUtils(appId, apiKey, environment);
            try {
                string findQueryParameters = "siloUserId=" + siloUserId + "&field=email&field=first_name&field=last_name&field=country";
                string user = utils.sendSignedRequest("GET", "/client/applications/" + appId + "/users", findQueryParameters, null);
                Console.WriteLine("user = " + user);
            } catch (WebException e) {
                using (StreamReader r = new StreamReader(e.Response.GetResponseStream()))
                {
                    string response = r.ReadToEnd();
                    Console.WriteLine(response);
                }
            }
        }
    }
}
