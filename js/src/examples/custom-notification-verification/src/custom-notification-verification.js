const crypto = require('crypto');

const message = '{"userId":"5acf2e9aa1df59250ba7ad99","siloUserId":"5acf2e9aa1df59250ba7ad9a","applicationId":"5784bb20d47ac0253d8d4926","applicationName":"Red Bull Mind Gamers","createdAt":"2018-04-27T10:00:32.227Z","type":"APPLICATION_DEACTIVATED","info":{"reason":"VERIFICATION_EXPIRED","fields":[{"key":"email","value":"sioclaeh@wegwerfemail.de","mandatory":true,"type":"TEXT"}]},"userAgent":{"device":{"name":"Hacker","brand":"Hacker","class":"Hacker"},"os":{"name":"Hacker","class":"Hacker","version":"Hacker"},"agent":{"name":"Hacker","class":"Hacker","version":"Hacker"}},"geoLocation":{"country":"DE","city":"FRANKFURT","latitude":"50.12","longitude":"8.68"},"advertising":{}}';
// This should be read from the header X-UIM-RSA-Signature-value
const signature = '0crsyFqhTQdhK+NczbL2O2PrZbVBPYuZvG0OXcoEVTIwAj0q+Xyw9NyoaMr+XGirDa03MscewfITg1AMVK1yY4JkLjTdXzwvIxgWy4RXEMlF0FDdUDFGT9hvKtaBQzJ1bjpzCRrMvCi99g5+Dbe01YqxMXATU6M/sY8gslBSaFqRZf36vY6OaP4vqalUuZrBfgygWjfvLZlZAr57+/H3X8bEpp3c6EDPBNaR4k4SiGZHHQ95bQ9aJpLJkzHYknpYTVCkxBddh0w7Stg5wh2RD+UXxqxF6ScTSKSYLvysvYxR54bJcMaHSH2YHi13doyDlqMyy9b5iJNr170Eyh7o7w==';
// The public key for your application/silo can be found here https://platformservices.redbull.com/docs/authenticating-with-uim-jwt#section-where-do-i-get-the-public-key-from
const key =
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA098tPBoyYBQB7pIAiBDX\n' +
    'CLH47CSIAwchk0dpnpdqi4Rnsa4FjJhTVQdHXOYN82N6Yn6YXBgFRTV01H6p8NEW\n' +
    'hS3ku8h2Z5yhGcy446ZQHYzjyRBYj7KuBXsmHibRIMOsU16ajdrUkrDzf63DMwIn\n' +
    'THrQROynv2nljDuXjW7uET02ujVi51Ygmg/oA2YS2/Tjbd8mr/Q0obzrp/RQupV3\n' +
    'GiIn1Wu70oCpzqzEEsTdQk1UwW+64H6DrpVnjEfhUK6GRB8p9TEZmsj2T6gaIe+p\n' +
    'RcS+r2AEHpy872sSRqLoLqDsLafg3ELjXJYwe63MXGkLPeuYGEjYodo6B0ErYfQi\n' +
    'yQIDBlU3\n' +
    '-----END PUBLIC KEY-----\n';

let verifier = crypto.createVerify('RSA-SHA256');
verifier.update(message);
const verified = verifier.verify(key, signature, 'base64');
console.log(verified);
