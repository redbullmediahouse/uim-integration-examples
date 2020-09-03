const CryptoJS = require("crypto-js");
const axios = require('axios').default;

const apiKey = process.env.API_KEY;
const formAlias = 'rb_timelaps_uk_2020';
const environment = process.env.ENVIRONMENT || 'design';

function createHmacSignature(formAlias, signature) {
    const hmacSignature = `HMAC FORM:${formAlias}:${signature}`;
    console.log(`HMAC signature: ${hmacSignature}`);
    return hmacSignature;
}

async function sendQuery(method, body, formAlias, signature, url, acceptHeader, date) {
    const hmacSignature = createHmacSignature(formAlias, signature);
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
    const params = [formAlias, requestMethod, requestPath, query, acceptHeader, body, date];
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
    return await sendQuery(method, body, formAlias, signature, url, acceptHeader, date);
}

const jsonBody = {
    fields: {
        first_name: "Jane",
        last_name: "Elliott",
        email: "example@example.com",
        gender: "FEMALE",
        city: "Barcelona",
        country: "ES",
        zip_code: "12345"
    },
    formAlias: formAlias,
    language: "en",
    country: "US",
    policyTypes: ["privacy"],
    newsletterAccepted: false,
    source: "US_MY-ACTIVATION_02-20",
    lucidId: "L123",
    customPolicies: [
        { type: "participation", url: "https://www.redbull.com/participation.pdf" },
        { type: "disclaimer", url: "https://www.redbull.com/disclaimer.pdf" }
    ],
    skipVerification: true,
};
console.log('Sending ... ');
const output = send('POST', jsonBody,`/client/applications/${formAlias}/form-submissions`, "");
output.then(data => {
    console.log('Received: ', data);
}).catch(err => {
    console.error('Something went wrong: ', err);
});
