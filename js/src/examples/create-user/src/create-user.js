const CryptoJS = require("crypto-js");
const axios = require('axios').default;

const appId = process.env.APPLICATION_ID;
const apiKey = process.env.API_KEY;
const environment = process.env.ENVIRONMENT || 'design';

function createSignature(appId, apiKey, requestMethod, requestPath, query, acceptHeader, body, date) {
    const params = [appId, requestMethod, requestPath, query, acceptHeader, body, date];
    const rawSignature = params.join('\n');
    const hash = CryptoJS.HmacSHA256(rawSignature, apiKey);
    return CryptoJS.enc.Base64.stringify(hash);
}

function createUimUrl(environment, requestPath) {
    let baseUrl;
    if (environment === 'production') {
        baseUrl = 'https://uim.redbull.com/uim';
    } else if (environment === 'design') {
        baseUrl = 'https://uim-design.redbull.com/uim';
    } else {
        throw new Error(`Unknown environment ${environment}`);
    }
    return `${baseUrl}${requestPath}`;
}

function createHmacSignature(appId, signature) {
    return `HMAC ${appId}:${signature}`;
}

function createCurrentDateTime() {
    return new Date().toUTCString();
}

async function sendQuery(method, body, appId, signature, url, acceptHeader, date) {
    const hmacSignature = createHmacSignature(appId, signature);
    return new Promise((resolve, reject) => {
        axios({
            method,
            url,
            headers: {
                'Accept': acceptHeader,
                'UIM-Date': date,
                'Authorization': hmacSignature,
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: body
        }).then((response) =>  {
            resolve(response.data);
        }).catch(err => {
            console.error(`Could not send query to UIM: ${err}`);
            reject(err);
        });
    });
}

function getRegistrationItems() {
    const requestPath = '/api/application/registration-items';
    const url = createUimUrl(environment, requestPath);
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url,
            headers: {
                'Accept': 'application/vnd.rb.uim-v16+json',
                'Application-Id': appId
            }
        }).then((response) =>  {
            resolve(response.data);
        }).catch(err => {
            console.error(`Could not get registration items: ${err}`);
            reject(err);
        });
    });
};

async function createUser() {
    const acceptHeader = "application/vnd.rb.uim-v1+json";
    const method = 'POST';
    const query = '';
    const date = createCurrentDateTime();
    const requestPath = `/client/applications/${appId}/users`;
    const url = createUimUrl(environment, requestPath);
    const registrationItems = await getRegistrationItems();
    let policiesObject = {};
    const policies = registrationItems.policies;
    policies.forEach(policy => {
        const policyId = policy.id;
        policiesObject[policyId] = true;
    });
    const body = {
        applicationId: appId,
        profileFields: {
            email: "test_user_mail@gmail.com",
            first_name: "Test",
            title: "MR",
            zip_code: "5020",
            country: "AT"
        },
        targetUrl: "https://uim-design.redbull.com/static/plugin-demos/3.4/redbull/index.html",
        password: "Testtest1.",
        language: "en",
        country: "ZZ",
        policies: policiesObject,
        newsletters: [],
        source: ""
    };
    const parsedBody = CryptoJS.enc.Utf8.parse(JSON.stringify(body));
    const base64Body = CryptoJS.enc.Base64.stringify(parsedBody);
    const signature = createSignature(appId, apiKey, method, requestPath, query, acceptHeader, base64Body, date);
    return await sendQuery(method, body, appId, signature, url, acceptHeader, date);
}

console.log('Creating user...');
const result = createUser();
result.then((data) => {
    console.log('Received: ', data);
}).catch((err) => {
    console.error('Something went wrong: ', err);
});
