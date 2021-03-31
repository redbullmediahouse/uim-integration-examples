const CryptoJS = require("crypto-js");
const axios = require('axios').default;

const siloUserId = process.env.SILO_USER_ID;
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

async function sendQuery(method, appId, signature, url, acceptHeader, date) {
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
            }
        }).then((response) =>  {
            resolve(response.status + ' ' + response.data);
        }).catch(err => {
            console.error(`Could not send query to UIM: ${err}`);
            reject(err);
        });
    });
}

async function deleteUser() {
    const acceptHeader = "application/vnd.rb.uim-v1+json";
    const method = 'DELETE';
    const query = '';
    const date = createCurrentDateTime();
    const requestPath = `/client/applications/${appId}/users/${siloUserId}`;
    const url = createUimUrl(environment, requestPath);
    const body = '';
    const signature = createSignature(appId, apiKey, method, requestPath, query, acceptHeader, body, date);
    return await sendQuery(method, appId, signature, url, acceptHeader, date);
}

console.log('Deleting user...');
const result = deleteUser();
result.then((data) => {
    console.log('Received: ', data);
}).catch((err) => {
    console.error('Something went wrong: ', err);
});
