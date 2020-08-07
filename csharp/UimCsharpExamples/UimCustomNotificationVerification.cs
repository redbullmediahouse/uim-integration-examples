using System;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using Utils;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;

namespace UimExamples
{
    class UimCustomNotificationVerification
    {
        public void verify()
        {
            try
            {
                // This is the body of the request
                string message = "{\"userId\":\"5acf2e9aa1df59250ba7ad99\",\"siloUserId\":\"5acf2e9aa1df59250ba7ad9a\",\"applicationId\":\"5784bb20d47ac0253d8d4926\",\"applicationName\":\"Red Bull Mind Gamers\",\"createdAt\":\"2018-04-27T10:00:32.227Z\",\"type\":\"APPLICATION_DEACTIVATED\",\"info\":{\"reason\":\"VERIFICATION_EXPIRED\",\"fields\":[{\"key\":\"email\",\"value\":\"sioclaeh@wegwerfemail.de\",\"mandatory\":true,\"type\":\"TEXT\"}]},\"userAgent\":{\"device\":{\"name\":\"Hacker\",\"brand\":\"Hacker\",\"class\":\"Hacker\"},\"os\":{\"name\":\"Hacker\",\"class\":\"Hacker\",\"version\":\"Hacker\"},\"agent\":{\"name\":\"Hacker\",\"class\":\"Hacker\",\"version\":\"Hacker\"}},\"geoLocation\":{\"country\":\"DE\",\"city\":\"FRANKFURT\",\"latitude\":\"50.12\",\"longitude\":\"8.68\"},\"advertising\":{}}";
                // This should be read from the header X-UIM-RSA-Signature-value
                string signature = "0crsyFqhTQdhK+NczbL2O2PrZbVBPYuZvG0OXcoEVTIwAj0q+Xyw9NyoaMr+XGirDa03MscewfITg1AMVK1yY4JkLjTdXzwvIxgWy4RXEMlF0FDdUDFGT9hvKtaBQzJ1bjpzCRrMvCi99g5+Dbe01YqxMXATU6M/sY8gslBSaFqRZf36vY6OaP4vqalUuZrBfgygWjfvLZlZAr57+/H3X8bEpp3c6EDPBNaR4k4SiGZHHQ95bQ9aJpLJkzHYknpYTVCkxBddh0w7Stg5wh2RD+UXxqxF6ScTSKSYLvysvYxR54bJcMaHSH2YHi13doyDlqMyy9b5iJNr170Eyh7o7w==";
                // The public key for your application/silo can be found here https://platformservices.redbull.com/docs/authenticating-with-uim-jwt#section-where-do-i-get-the-public-key-from
                string pem = "-----BEGIN PUBLIC KEY-----\n" +
                        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA098tPBoyYBQB7pIAiBDX" +
                                "CLH47CSIAwchk0dpnpdqi4Rnsa4FjJhTVQdHXOYN82N6Yn6YXBgFRTV01H6p8NEW" +
                                "hS3ku8h2Z5yhGcy446ZQHYzjyRBYj7KuBXsmHibRIMOsU16ajdrUkrDzf63DMwIn" +
                                "THrQROynv2nljDuXjW7uET02ujVi51Ygmg/oA2YS2/Tjbd8mr/Q0obzrp/RQupV3" +
                                "GiIn1Wu70oCpzqzEEsTdQk1UwW+64H6DrpVnjEfhUK6GRB8p9TEZmsj2T6gaIe+p" +
                                "RcS+r2AEHpy872sSRqLoLqDsLafg3ELjXJYwe63MXGkLPeuYGEjYodo6B0ErYfQi" +
                                "yQIDBlU3\n" +
                 "-----END PUBLIC KEY-----";

                RSAParameters pubKey = ImportPublicKey(pem);
                var data = Encoding.UTF8.GetBytes(message);
                byte[] signatureBytes = Convert.FromBase64String(signature);

                bool verified = VerifyData(message, signature, pubKey);
                Console.WriteLine("Verified example message with " + verified);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public RSAParameters ImportPublicKey(string pem)
        {
            AsymmetricKeyParameter publicKey = ReadAsymmetricKeyParameter(pem);
            RSAParameters rsaParams = DotNetUtilities.ToRSAParameters((RsaKeyParameters)publicKey);
            return rsaParams;
        }

        public Org.BouncyCastle.Crypto.AsymmetricKeyParameter ReadAsymmetricKeyParameter(string pem)
        {
            PemReader pr = new PemReader(new StringReader(pem));
            AsymmetricKeyParameter publicKey = (AsymmetricKeyParameter)pr.ReadObject();
            return publicKey;
        }

        public bool VerifyData(string originalMessage, string signedMessage, RSAParameters publicKey)
        {
            bool success = false;
            using (var rsa = new RSACryptoServiceProvider())
            {
                var encoder = new UTF8Encoding();
                byte[] bytesToVerify = encoder.GetBytes(originalMessage);
                byte[] signedBytes = Convert.FromBase64String(signedMessage);
                try
                {
                    rsa.ImportParameters(publicKey);
                    SHA256Managed Hash = new SHA256Managed();
                    byte[] hashedData = Hash.ComputeHash(signedBytes);
                    success = rsa.VerifyData(bytesToVerify, CryptoConfig.MapNameToOID("SHA256"), signedBytes);
                }
                catch (CryptographicException e)
                {
                    Console.WriteLine(e.Message);
                }
                finally
                {
                    rsa.PersistKeyInCsp = false;
                }
            }
            return success;
        }
    }
}
