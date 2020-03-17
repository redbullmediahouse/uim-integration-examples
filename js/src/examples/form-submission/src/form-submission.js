const CryptoJS = require("crypto-js");
const axios = require('axios').default;

const appId = process.env.APPLICATION_ID;
const apiKey = process.env.API_KEY;
const formAlias = 'integration_example_form';
const environment = process.env.ENVIRONMENT || 'design';

function createHmacSignature(appId, signature) {
    const hmacSignature = `HMAC ${appId}:${signature}`;
    console.log(`AppId: ${appId}`);
    console.log(`HMAC signature: ${hmacSignature}`);
    return hmacSignature;
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
            console.error(`Could not send query to UIM! ${err}`);
            reject(err);
        });
    });
}

function uimUrl(requestPath) {
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

function createSignature(requestMethod, requestPath, query, acceptHeader, body, date) {
    const params = [appId, requestMethod, requestPath, query, acceptHeader, body, date];
    const rawSignature = params.join('\n');
    const hash = CryptoJS.HmacSHA256(rawSignature, apiKey);
    return CryptoJS.enc.Base64.stringify(hash);
}

function createCurrentDateTime() {
    return new Date().toUTCString();
}

async function send(method, body, requestPath, query) {
    const acceptHeader = 'application/vnd.rb.uim-v1+json';
    const date = createCurrentDateTime();
    const parsedBody = CryptoJS.enc.Utf8.parse(JSON.stringify(body));
    const base64Body = CryptoJS.enc.Base64.stringify(parsedBody);
    const signature = createSignature(method, requestPath, query, acceptHeader, base64Body, date);
    let url = uimUrl(requestPath);
    if (query !== '') {
        url = url.concat('?', query);
    }
    return await sendQuery(method, body, appId, signature, url, acceptHeader, date);
}

const jsonBody = {
    fields: {
        first_name: "Jane",
        last_name: "Elliott",
        email: "youremail@yourDomain.com",
        gender: "FEMALE",
        city: "Barcelona",
        country: "ES",
        zip_code: "12345"
    },
    formAlias: formAlias,
    language: "en",
    country: "US",
    policyTypes: ["privacy"],
    newsletterAccepted: true,
    source: "US_MY-ACTIVATION_02-20"
};
console.log('Sending ... ');
const output = send('POST', jsonBody,`/client/applications/${appId}/form-submissions`, "");
output.then(data => {
    console.log('Received: ', data);
}).catch(err => {
    console.error('Something went wrong: ', err);
});
