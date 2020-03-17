const crypto = require('@trust/webcrypto');

function verify() {
    // body of the request
    const message = {
        userId: "5acf2e9aa1df59250ba7ad99",
        siloUserId: "5acf2e9aa1df59250ba7ad9a",
        applicationId: "5784bb20d47ac0253d8d4926",
        applicationName: "Red Bull Mind Gamers",
        createdAt: "2018-04-27T10:00:32.227Z",
        type: "APPLICATION_DEACTIVATED",
        info: {
            reason: "VERIFICATION_EXPIRED",
            fields:[
                {
                    key: "email",
                    value: "sioclaeh@wegwerfemail.de",
                    mandatory: true,
                    type: "TEXT"
                }
            ]
        },
        userAgent: {
            device:{
                name :"Hacker",
                brand: "Hacker",
                class: "Hacker"
            },
            os: {
                name: "Hacker",
                class: "Hacker",
                version: "Hacker"
            },
            agent: {
                name: "Hacker",
                class: "Hacker",
                version: "Hacker"
            }
        },
        geoLocation: {
            country: "DE",
            city: "FRANKFURT",
            latitude: "50.12",
            longitude: "8.68"
        },
        advertising:{}
    };
    // inside the header (X-UIM-RSA-Signature-value)
    const signature = "0crsyFqhTQdhK+NczbL2O2PrZbVBPYuZvG0OXcoEVTIwAj0q+Xyw9NyoaMr+XGirDa03MscewfITg1AMVK1yY4JkLjTdXzwvIxgWy4RXEMlF0FDdUDFGT9hvKtaBQzJ1bjpzCRrMvCi99g5+Dbe01YqxMXATU6M/sY8gslBSaFqRZf36vY6OaP4vqalUuZrBfgygWjfvLZlZAr57+/H3X8bEpp3c6EDPBNaR4k4SiGZHHQ95bQ9aJpLJkzHYknpYTVCkxBddh0w7Stg5wh2RD+UXxqxF6ScTSKSYLvysvYxR54bJcMaHSH2YHi13doyDlqMyy9b5iJNr170Eyh7o7w==";
    // public key for your application/silo can be found here https://platformservices.redbull.com/docs/authenticating-with-uim-jwt#section-where-do-i-get-the-public-key-from
    const pem = // "-----BEGIN PUBLIC KEY-----" +
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA098tPBoyYBQB7pIAiBDX" +
        "CLH47CSIAwchk0dpnpdqi4Rnsa4FjJhTVQdHXOYN82N6Yn6YXBgFRTV01H6p8NEW" +
        "hS3ku8h2Z5yhGcy446ZQHYzjyRBYj7KuBXsmHibRIMOsU16ajdrUkrDzf63DMwIn" +
        "THrQROynv2nljDuXjW7uET02ujVi51Ygmg/oA2YS2/Tjbd8mr/Q0obzrp/RQupV3" +
        "GiIn1Wu70oCpzqzEEsTdQk1UwW+64H6DrpVnjEfhUK6GRB8p9TEZmsj2T6gaIe+p" +
        "RcS+r2AEHpy872sSRqLoLqDsLafg3ELjXJYwe63MXGkLPeuYGEjYodo6B0ErYfQi" +
        "yQIDBlU3";
    // + "-----END PUBLIC KEY-----";

    const publicKeyBase64 = new Buffer(pem).toString('base64');

    // convert the public key in base 64 to array buffer
    //const publicKeyArrayBuffer = stringToArrayBuffer(pem);
    const publicKeyAscii = new Buffer(publicKeyBase64, 'base64').toString('ascii');
    const publicKeyArrayBuffer = stringToArrayBuffer(publicKeyAscii);

    // import the key to verify RSA signature with SHA 256
    /*
    crypto.subtle.importKey(
        "spki",
        publicKeyArrayBuffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' }},
        false,
        ["verify"]
    ).then(function(key) {
        console.log('Verification complete. Key: ', key);
    }).catch(function(err) {
        console.error(err);
    });
     */
    crypto.subtle.importKey(
        "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        {   //this is an example jwk key, other key types are Uint8Array objects
            kty: "RSA",
            e: "AQAB",
            n: "123",
            alg: "RS256",
            ext: true,
        },
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        false,
        ["verify"]
    ).then(function(publicKey){
        console.log('result = ', publicKey);
    })
    .catch(function(err){
        console.error('Something went wrong: ', err);
    });
}

function stringToArrayBuffer(str) {
    const arrayBuffer = new ArrayBuffer(str.length);
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

verify();
