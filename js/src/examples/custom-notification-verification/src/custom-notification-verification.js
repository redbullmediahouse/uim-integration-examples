const crypto = require('crypto');

const message1 = '{"userId":"6054ab12c988f0047291ba7f","siloUserId":"6054ab12c988f0047291ba80","applicationId":"5b2ce30bd9a0bf285ac70c10","applicationName":"Red Bull","createdAt":"2021-03-22T15:26:10.275Z","type":"REGISTRATION_VERIFIED","info":{"socialMediaAccounts":[],"accepted_newsletters":[],"formSubmissionId":"6058b71237ccda2ea3663cb2","origin":"native","verifiedAt":"2021-03-22T15:26:10.275149Z","language":"en","source":"HQ_The-Cans-Are-Out-There-HQ-Placeholder-for-Jotform_03_21","avatar":{},"unmappedFields":{},"rawRequest":"{\"slug\":\"submit/210744869485065/\",\"q3_name\":{\"first\":\"Pablo\",\"last\":\"Torregrosa\"},\"q4_email\":\"pablo.torregrosapaez@redbull.com\",\"q6_typeA\":\"{\\\"widgetName\\\":\\\"consent\\\",\\\"policyTypes\\\":[\\\"privacy\\\"],\\\"customPolicies\\\":[{\\\"type\\\":\\\"participation\\\",\\\"url\\\":\\\"www.redbull.com\\\"}],\\\"newsletters\\\":[],\\\"snippets\\\":[],\\\"country\\\":\\\"INT\\\",\\\"lang\\\":\\\"en\\\",\\\"formAlias\\\":\\\"rb_the_cans_are_out_there_2021\\\",\\\"source\\\":\\\"HQ_The-Cans-Are-Out-There-HQ-Placeholder-for-Jotform_03_21\\\",\\\"lucidId\\\":\\\"L1184-1\\\"}\",\"event_id\":\"1616426736032_210744869485065_kcJlYeV\",\"enterprise_server\":\"redbull.jotform.com\"}","externalFormId":"210744869485065","externalSystemId":"jotform","verificationPending":false,"userType":"registered","fields":[{"key":"first_name","value":"Pablo","mandatory":true,"type":"TEXT"},{"key":"last_name","value":"Torregrosa","mandatory":true,"type":"TEXT"},{"key":"email","value":"pablo.torregrosapaez@redbull.com","mandatory":true,"type":"TEXT","verified":true}],"lucidId":"L1184-1","submittedAt":"2021-03-22T15:26:10.275149Z","formAlias":"rb_the_cans_are_out_there_2021","userConsents":[{"masterDocumentId":"b1478104-6594-41ef-906b-abba99d20ab2","documentId":"b5edb2c5-69a8-4059-84c5-354a7a9483f3","title":"Privacy Policy - Automation - International","mandatory":true,"accepted":true,"type":"privacy","version":"9","timeOfConsent":"2021-03-22T15:26:10.295Z","url":"https://policies.redbull.com/policies/Red_Bull_Global/202101121100/en/privacy.html","custom":false,"renderingType":"implicit"},{"masterDocumentId":"7e156272-5ecc-4824-95c6-f6a4a399636a","documentId":"custom_0e06bf1e-9af3-4030-83c2-3917d5269dd6","title":"custom_participation","mandatory":false,"accepted":true,"type":"participation","version":"custom_policy_version_1","timeOfConsent":"2021-03-22T15:26:10.316387Z","url":"www.redbull.com","custom":true,"renderingType":"explicit"}]},"geoLocation":{"country":"DE","city":"FRANKFURT","latitude":"50.12","longitude":"8.68"},"advertising":{}}';
	// message 1 as raw string can be used without escaping any chars.
const message1_raw = String.raw`{"userId":"6054ab12c988f0047291ba7f","siloUserId":"6054ab12c988f0047291ba80","applicationId":"5b2ce30bd9a0bf285ac70c10","applicationName":"Red Bull","createdAt":"2021-03-22T15:26:10.275Z","type":"REGISTRATION_VERIFIED","info":{"socialMediaAccounts":[],"accepted_newsletters":[],"formSubmissionId":"6058b71237ccda2ea3663cb2","origin":"native","verifiedAt":"2021-03-22T15:26:10.275149Z","language":"en","source":"HQ_The-Cans-Are-Out-There-HQ-Placeholder-for-Jotform_03_21","avatar":{},"unmappedFields":{},"rawRequest":"{\"slug\":\"submit/210744869485065/\",\"q3_name\":{\"first\":\"Pablo\",\"last\":\"Torregrosa\"},\"q4_email\":\"pablo.torregrosapaez@redbull.com\",\"q6_typeA\":\"{\\\"widgetName\\\":\\\"consent\\\",\\\"policyTypes\\\":[\\\"privacy\\\"],\\\"customPolicies\\\":[{\\\"type\\\":\\\"participation\\\",\\\"url\\\":\\\"www.redbull.com\\\"}],\\\"newsletters\\\":[],\\\"snippets\\\":[],\\\"country\\\":\\\"INT\\\",\\\"lang\\\":\\\"en\\\",\\\"formAlias\\\":\\\"rb_the_cans_are_out_there_2021\\\",\\\"source\\\":\\\"HQ_The-Cans-Are-Out-There-HQ-Placeholder-for-Jotform_03_21\\\",\\\"lucidId\\\":\\\"L1184-1\\\"}\",\"event_id\":\"1616426736032_210744869485065_kcJlYeV\",\"enterprise_server\":\"redbull.jotform.com\"}","externalFormId":"210744869485065","externalSystemId":"jotform","verificationPending":false,"userType":"registered","fields":[{"key":"first_name","value":"Pablo","mandatory":true,"type":"TEXT"},{"key":"last_name","value":"Torregrosa","mandatory":true,"type":"TEXT"},{"key":"email","value":"pablo.torregrosapaez@redbull.com","mandatory":true,"type":"TEXT","verified":true}],"lucidId":"L1184-1","submittedAt":"2021-03-22T15:26:10.275149Z","formAlias":"rb_the_cans_are_out_there_2021","userConsents":[{"masterDocumentId":"b1478104-6594-41ef-906b-abba99d20ab2","documentId":"b5edb2c5-69a8-4059-84c5-354a7a9483f3","title":"Privacy Policy - Automation - International","mandatory":true,"accepted":true,"type":"privacy","version":"9","timeOfConsent":"2021-03-22T15:26:10.295Z","url":"https://policies.redbull.com/policies/Red_Bull_Global/202101121100/en/privacy.html","custom":false,"renderingType":"implicit"},{"masterDocumentId":"7e156272-5ecc-4824-95c6-f6a4a399636a","documentId":"custom_0e06bf1e-9af3-4030-83c2-3917d5269dd6","title":"custom_participation","mandatory":false,"accepted":true,"type":"participation","version":"custom_policy_version_1","timeOfConsent":"2021-03-22T15:26:10.316387Z","url":"www.redbull.com","custom":true,"renderingType":"explicit"}]},"geoLocation":{"country":"DE","city":"FRANKFURT","latitude":"50.12","longitude":"8.68"},"advertising":{}}`;
   // message 1 with correct escaped \
const message1_escaped = '{"userId":"6054ab12c988f0047291ba7f","siloUserId":"6054ab12c988f0047291ba80","applicationId":"5b2ce30bd9a0bf285ac70c10","applicationName":"Red Bull","createdAt":"2021-03-22T15:26:10.275Z","type":"REGISTRATION_VERIFIED","info":{"socialMediaAccounts":[],"accepted_newsletters":[],"formSubmissionId":"6058b71237ccda2ea3663cb2","origin":"native","verifiedAt":"2021-03-22T15:26:10.275149Z","language":"en","source":"HQ_The-Cans-Are-Out-There-HQ-Placeholder-for-Jotform_03_21","avatar":{},"unmappedFields":{},"rawRequest":"{\\"slug\\":\\"submit/210744869485065/\\",\\"q3_name\\":{\\"first\\":\\"Pablo\\",\\"last\\":\\"Torregrosa\\"},\\"q4_email\\":\\"pablo.torregrosapaez@redbull.com\\",\\"q6_typeA\\":\\"{\\\\\\"widgetName\\\\\\":\\\\\\"consent\\\\\\",\\\\\\"policyTypes\\\\\\":[\\\\\\"privacy\\\\\\"],\\\\\\"customPolicies\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"participation\\\\\\",\\\\\\"url\\\\\\":\\\\\\"www.redbull.com\\\\\\"}],\\\\\\"newsletters\\\\\\":[],\\\\\\"snippets\\\\\\":[],\\\\\\"country\\\\\\":\\\\\\"INT\\\\\\",\\\\\\"lang\\\\\\":\\\\\\"en\\\\\\",\\\\\\"formAlias\\\\\\":\\\\\\"rb_the_cans_are_out_there_2021\\\\\\",\\\\\\"source\\\\\\":\\\\\\"HQ_The-Cans-Are-Out-There-HQ-Placeholder-for-Jotform_03_21\\\\\\",\\\\\\"lucidId\\\\\\":\\\\\\"L1184-1\\\\\\"}\\",\\"event_id\\":\\"1616426736032_210744869485065_kcJlYeV\\",\\"enterprise_server\\":\\"redbull.jotform.com\\"}","externalFormId":"210744869485065","externalSystemId":"jotform","verificationPending":false,"userType":"registered","fields":[{"key":"first_name","value":"Pablo","mandatory":true,"type":"TEXT"},{"key":"last_name","value":"Torregrosa","mandatory":true,"type":"TEXT"},{"key":"email","value":"pablo.torregrosapaez@redbull.com","mandatory":true,"type":"TEXT","verified":true}],"lucidId":"L1184-1","submittedAt":"2021-03-22T15:26:10.275149Z","formAlias":"rb_the_cans_are_out_there_2021","userConsents":[{"masterDocumentId":"b1478104-6594-41ef-906b-abba99d20ab2","documentId":"b5edb2c5-69a8-4059-84c5-354a7a9483f3","title":"Privacy Policy - Automation - International","mandatory":true,"accepted":true,"type":"privacy","version":"9","timeOfConsent":"2021-03-22T15:26:10.295Z","url":"https://policies.redbull.com/policies/Red_Bull_Global/202101121100/en/privacy.html","custom":false,"renderingType":"implicit"},{"masterDocumentId":"7e156272-5ecc-4824-95c6-f6a4a399636a","documentId":"custom_0e06bf1e-9af3-4030-83c2-3917d5269dd6","title":"custom_participation","mandatory":false,"accepted":true,"type":"participation","version":"custom_policy_version_1","timeOfConsent":"2021-03-22T15:26:10.316387Z","url":"www.redbull.com","custom":true,"renderingType":"explicit"}]},"geoLocation":{"country":"DE","city":"FRANKFURT","latitude":"50.12","longitude":"8.68"},"advertising":{}}';

// This should be read from the header X-UIM-RSA-Signature-value
const signature1 = 'A56CdyXRYvv96uv02ddpZoLAtD9WKRjDeLqenL75VvVljh/XoEDmfINig8UeF76JgfQtsWiUQMxKXVmHg6+iBfJbogFAfwsq//XA+yCVIy15up8RnV4I5ZUIBolmZDiHgRXf4zjL3DveMDDq50W2R9SVLYgpzKaL12hJnc52y+PgDJUB4Hus57yQw1aU2MLBcIyC71wZmMSCU/nPy9m6dy72AGiLjkd/4SpId2nhPPWE/SNPzhsocGH2s8O7NIsCd+ECqljjH7Sy8+fKn8Yop25/h2SDrmM5Br5ppGi+EsdWfrzTFK8FoZPJykMOags64MWydWAqmikpDck4EPKnxw==';

// The public key for your application/silo can be found here https://platformservices.redbull.com/docs/rsa-public-keys
const key =
    '-----BEGIN PUBLIC KEY-----\n' +
	'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoGtcnk6EuBCOaHZWk1R0\n' +
	'8cihHjRvEqdt0wZQcz71TfekSsEP2rk8rFR/xeB0iZVFNNqaia3oZTHP21A3LRhG\n' +
	'uXGuDdAR3+558bSw1C9lha6bqYZIQEytxE2kdjAMLMclG2xqwplE4oraa2O2VTj4\n' +
	'GYcY3W4tNZR9Np8HzGPWTOjZzMG6gYWPolgLVfQ/rFFmQs1ksyskcMYcUDoygHpu\n' +
	'qvUFtdLXQCBC7fhqk6LnYskJEpg52pX9pTB8OjH7fSpVJaApMAYjaO4sSI+Gmeb5\n' +
	'gNgvV0AB4AciZNJ69CEkn/pMSF3inNiKWZKDe93X9Cu34fghPu2A7VNz0fktP8eb\n' +
	'XwIDBlU3\n' +
	'-----END PUBLIC KEY-----\n';

function validate(msg, sig) {
	let verifier = crypto.createVerify('RSA-SHA256');
	verifier.update(msg);
	return verifier.verify(key, sig, 'base64');
}

const verified1 = validate(message1, signature1);
const verified1_raw = validate(message1_raw, signature1);
const verified1_escaped = validate(message1_escaped, signature1);

console.log('plain message with control symbols -> ' + verified1)
console.log(message1);
console.log("\n");

console.log('raw message with control symbols -> ' + verified1_raw)
console.log(message1_raw);
console.log("\n");

console.log('message manual escaped control symbols -> ' + verified1_escaped)
console.log(message1_escaped);
console.log("\n");
