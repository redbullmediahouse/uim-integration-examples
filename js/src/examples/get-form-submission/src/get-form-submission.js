const CryptoJS = require("crypto-js");
const axios = require('axios').default;

const formAlias = process.env.FORM_ALIAS;
const apiKey = process.env.API_KEY;
const environment = process.env.ENVIRONMENT || 'design';
const formSubmissionId = '5e7b2f4324a6b105ca25e909';

function createHmacSignature(formAlias, signature) {
    const hmacSignature = `HMAC FORM:${formAlias}:${signature}`;
    console.log(`HMAC signature: ${hmacSignature}`);
    return hmacSignature;
}

async function sendQuery(method, formAlias, signature, url, acceptHeader, date) {
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
            }
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

async function send(method, requestPath, query) {
    const acceptHeader = 'application/vnd.rb.uim-v1+json';
    const date = createCurrentDateTime();
    const body = '';
    const signature = createSignature(method, requestPath, query, acceptHeader, body, date);
    let url = uimUrl(requestPath);
    if (query !== '') {
        url = url.concat('?', query);
    }
    return await sendQuery(method, formAlias, signature, url, acceptHeader, date);
}

console.log('Sending ... ');
const output = send('GET', `/client/applications/${formAlias}/form-submissions/${formSubmissionId}`, "");
output.then(data => {
    console.log('Received: ', data);
}).catch(err => {
    console.error('Something went wrong: ', err);
});
