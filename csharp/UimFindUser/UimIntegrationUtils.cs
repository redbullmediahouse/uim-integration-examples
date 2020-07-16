using System;
using System.Text;
using System.IO;
using System.Security.Cryptography;
using System.Net;

namespace Utils {
    class UimIntegrationUtils {

        public UimIntegrationUtils(string appId, string apiKey, string environment) {
            ClientIdentifier = appId;
            ApiKey = apiKey;
            Environment = environment;
        }

        public string ClientIdentifier { get; }
        public string ApiKey { get; }
        public string Environment { get; }

        private string currentDatetime() {
            return DateTime.Now.ToUniversalTime().ToString("r");
        }

        private string base64(string payload) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(payload);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        private string hmacsha256(string key, string text) {
            UTF8Encoding encoding = new System.Text.UTF8Encoding();
            byte[] keyBytes = encoding.GetBytes(key);
            byte[] messageBytes = encoding.GetBytes(text);
            using (var hmacsha256 = new HMACSHA256(keyBytes))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                return System.Convert.ToBase64String(hashmessage);
            }

        }

        private string createSignature(string requestMethod, string requestPath, string query, string acceptHeader, string body, string date) {
            String base64Body = body != null ? base64(body) : "";
            String rawSignature = ClientIdentifier + "\n" +
                                 requestMethod + "\n" +
                                 requestPath + "\n" +
                                 query + "\n" +
                                 acceptHeader + "\n" +
                                 base64Body + "\n" +
                                 date;
            return hmacsha256(ApiKey, rawSignature);
        }

        private string uimUrl(string requestPath) {
            string baseUrl;
            if (Environment.Equals("design")) {
                baseUrl = "https://uim-design.redbull.com/uim";
            } else if (Environment.Equals("production")) {
                baseUrl = "https://uim.redbull.com/uim";
            } else if (Environment.Equals("local")) {
                baseUrl = "http://localhost:8090";
            } else {
                throw new System.Exception("Unknown environment " + Environment);
            }
            return baseUrl + requestPath;
        }

        private string callUim(string method, string body, string signature, string url, string acceptHeader, string date, bool useFormAuth) {
            WebClient webClient = new WebClient();
            webClient.Headers.Add("Accept", acceptHeader);
            webClient.Headers.Add("Content-Type", "application/json; charset=utf-8");
            webClient.Headers.Add("UIM-Date", date);
            webClient.Headers.Add("Authorization", "HMAC " + ClientIdentifier + ":" + signature);
            string response = "empty";
            if ("GET".Equals(method)) {
                response = webClient.DownloadString(url);
            }
            return response;
        }

        public string sendSignedRequest(string method, string requestPath, string query, string body) {
            return sendSignedRequest(method, requestPath, query, body, false);
        }

        public string sendSignedRequest(string method, string requestPath, string query, string body, bool useFormAuth) {
            string acceptHeader = "application/vnd.rb.uim-v1+json";
            string date = currentDatetime();
            string signature = createSignature(method, requestPath, query, acceptHeader, body, date);
            string url = uimUrl(requestPath);
            if (!String.IsNullOrEmpty(query)) {
                url += "?" + query;
            }
            return callUim(method, body, signature, url, acceptHeader, date, useFormAuth);
        }
    }
}