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
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }).then((response) =>  {
            resolve(response.data);
        }).catch(err => {
            console.error(`Could not send query to UIM: ${err}`);
            reject(err);
        });
    });
}

async function refreshToken() {
    const acceptHeader = "application/vnd.rb.uim-v1+json";
    const method = 'POST';
    const refreshToken = '3f4629741b1b21f4ec7026516868aaab';
    const query = `grant_type=refresh_token&scope=openid%20profile&refresh_token=${refreshToken}`;
    const date = new Date().toUTCString();
    const requestPath = `/client/token/oauth/refresh`;
    let url = createUimUrl(environment, requestPath);
    const body = '';
    const signature = createSignature(appId, apiKey, method, requestPath, query, acceptHeader, body, date);
    if (query !== '') {
        url += `?${query}`
    }
    console.log(`Sending request to ${url}`);
    return await sendQuery(method, appId, signature, url, acceptHeader, date);
}

console.log('POSTing...');
const result = refreshToken();
result.then((data) => {
    console.log('Received: ', data);
}).catch((err) => {
    console.error('Something went wrong: ', err);
});
