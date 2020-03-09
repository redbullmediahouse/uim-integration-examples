package examples;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import static java.nio.charset.StandardCharsets.UTF_8;

public class UimCustomNotificationVerification {
    public void verify() {
        try {
            // This is the body of the request
            String message = "{\"userId\":\"5acf2e9aa1df59250ba7ad99\",\"siloUserId\":\"5acf2e9aa1df59250ba7ad9a\",\"applicationId\":\"5784bb20d47ac0253d8d4926\",\"applicationName\":\"Red Bull Mind Gamers\",\"createdAt\":\"2018-04-27T10:00:32.227Z\",\"type\":\"APPLICATION_DEACTIVATED\",\"info\":{\"reason\":\"VERIFICATION_EXPIRED\",\"fields\":[{\"key\":\"email\",\"value\":\"sioclaeh@wegwerfemail.de\",\"mandatory\":true,\"type\":\"TEXT\"}]},\"userAgent\":{\"device\":{\"name\":\"Hacker\",\"brand\":\"Hacker\",\"class\":\"Hacker\"},\"os\":{\"name\":\"Hacker\",\"class\":\"Hacker\",\"version\":\"Hacker\"},\"agent\":{\"name\":\"Hacker\",\"class\":\"Hacker\",\"version\":\"Hacker\"}},\"geoLocation\":{\"country\":\"DE\",\"city\":\"FRANKFURT\",\"latitude\":\"50.12\",\"longitude\":\"8.68\"},\"advertising\":{}}";
            // This should be read from the header X-UIM-RSA-Signature-value
            String signature = "0crsyFqhTQdhK+NczbL2O2PrZbVBPYuZvG0OXcoEVTIwAj0q+Xyw9NyoaMr+XGirDa03MscewfITg1AMVK1yY4JkLjTdXzwvIxgWy4RXEMlF0FDdUDFGT9hvKtaBQzJ1bjpzCRrMvCi99g5+Dbe01YqxMXATU6M/sY8gslBSaFqRZf36vY6OaP4vqalUuZrBfgygWjfvLZlZAr57+/H3X8bEpp3c6EDPBNaR4k4SiGZHHQ95bQ9aJpLJkzHYknpYTVCkxBddh0w7Stg5wh2RD+UXxqxF6ScTSKSYLvysvYxR54bJcMaHSH2YHi13doyDlqMyy9b5iJNr170Eyh7o7w==";
            // The public key for your application/silo can be found here https://platformservices.redbull.com/docs/authenticating-with-uim-jwt#section-where-do-i-get-the-public-key-from
            String pem =// "-----BEGIN PUBLIC KEY-----" +
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA098tPBoyYBQB7pIAiBDX" +
                            "CLH47CSIAwchk0dpnpdqi4Rnsa4FjJhTVQdHXOYN82N6Yn6YXBgFRTV01H6p8NEW" +
                            "hS3ku8h2Z5yhGcy446ZQHYzjyRBYj7KuBXsmHibRIMOsU16ajdrUkrDzf63DMwIn" +
                            "THrQROynv2nljDuXjW7uET02ujVi51Ygmg/oA2YS2/Tjbd8mr/Q0obzrp/RQupV3" +
                            "GiIn1Wu70oCpzqzEEsTdQk1UwW+64H6DrpVnjEfhUK6GRB8p9TEZmsj2T6gaIe+p" +
                            "RcS+r2AEHpy872sSRqLoLqDsLafg3ELjXJYwe63MXGkLPeuYGEjYodo6B0ErYfQi" +
                            "yQIDBlU3";
            // + "-----END PUBLIC KEY-----";

            X509EncodedKeySpec pubKeySpec = new X509EncodedKeySpec(Base64.getDecoder().decode(pem));
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey pubKey = keyFactory.generatePublic(pubKeySpec);
            Signature publicSignature = Signature.getInstance("SHA256withRSA");
            publicSignature.initVerify(pubKey);
            publicSignature.update(message.getBytes(UTF_8));

            byte[] signatureBytes = Base64.getDecoder().decode(signature);

            boolean verified = publicSignature.verify(signatureBytes);
            System.out.println("Verified example message with " + verified);
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
