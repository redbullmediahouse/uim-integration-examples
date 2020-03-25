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
            resolve(response.data);
        }).catch(err => {
            console.error(`Could not send query to UIM: ${err}`);
            reject(err);
        });
    });
}

async function findUser() {
    const acceptHeader = "application/vnd.rb.uim-v1+json";
    const method = 'GET';
    const siloUserId = '59ccee7e23d2213cb70d9e0f';
    const query = `siloUserId=${siloUserId}&field=email&field=first_name&field=last_name&field=country`;
    const date = new Date().toUTCString();
    const requestPath = `/client/applications/${appId}/users`;
    let url = createUimUrl(environment, requestPath);
    const body = '';
    const signature = createSignature(appId, apiKey, method, requestPath, query, acceptHeader, body, date);
    if (query !== '') {
        url += `?${query}`
    }
    return await sendQuery(method, appId, signature, url, acceptHeader, date);
}

console.log('Finding user...');
const result = findUser();
result.then((data) => {
    console.log('Received: ', data);
}).catch((err) => {
    console.error('Something went wrong: ', err);
});
