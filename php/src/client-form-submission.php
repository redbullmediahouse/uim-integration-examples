<?php

use Psr\Http\Message\StreamInterface;

require 'vendor/autoload.php';

$appId = $_ENV["APPLICATION_ID"];
$apiKey = $_ENV["API_KEY"];
$formAlias = "integration_example_form";
$environment = $_ENV['ENVIRONMENT'] ?? 'design';

function uimUrl($requestPath)
{
    global $environment;

    if ($environment == "design") {
        $baseUrl = "https://uim-design.redbull.com/uim";
    } else if ($environment == "production") {
        $baseUrl = "https://uim.redbull.com/uim";
    } else {
        throw new Exception("Unknown environment '" . $environment . "'.");
    }

    return $baseUrl . $requestPath;
}

function createSignature($requestMethod, $requestPath, $query, $acceptHeader, $body, $date)
{
    global $appId;
    global $apiKey;

    $params = [$appId, $requestMethod, $requestPath, $query, $acceptHeader, $body, $date];
    $rawSignature = implode("\n", $params);

    return base64_encode(hash_hmac('sha256', $rawSignature, $apiKey, true));
}

function createHmac($appId, string $signature): string
{
    $hmacSignature = "HMAC " . $appId . ":" . $signature;
    echo "AppId: " . $appId . "\n";
    echo "Signature: " . $hmacSignature . "\n";
    return $hmacSignature;
}

function callUim($method, $body, $appId, string $signature, string $url, string $acceptHeader, string $date): StreamInterface
{
    $hmacSignature = createHmac($appId, $signature);

    try {
        $client = new GuzzleHttp\Client();
        $response = $client->request($method, $url, ['headers' => ['Accept' => $acceptHeader,
            'UIM-Date' => $date,
            'Authorization' => $hmacSignature,
            'Content-Type' => 'application/json; charset=utf-8'],
            'body' => $body]);
        return $response->getBody();
    } catch (\Exception $e) {
        echo "Received exception " . $e;
        $response = $e->getResponse();
        $responseBodyAsString = $response->getBody()->getContents();

        return $responseBodyAsString;
    }
}

function currentDatetime(): string
{
    $now = new \DateTime();
    $now->setTimezone(new \DateTimeZone("UTC"));
    $date = $now->format("D, d M Y H:i:s") . " GMT";
    return $date;
}

function sendSignedRequest($method, $requestPath, $query, $body)
{
    global $appId;

    $acceptHeader = "application/vnd.rb.uim-v1+json";
    $date = currentDatetime();
    $base64Body = base64_encode($body);
    $signature = createSignature($method, $requestPath, $query, $acceptHeader, $base64Body, $date);

    $url = uimUrl($requestPath);
    if (!empty($query)) {
        $url .= "?" . $query;
    }

    return callUim($method, $body, $appId, $signature, $url, $acceptHeader, $date);
}

$jsonBody = '{
    "fields": {
        "first_name":"Jane",
        "last_name":"Elliott",
        "email":"youremail@yourDomain.com",
        "gender":"FEMALE",
        "city":"Barcelona",
        "country": "ES",
        "zip_code":"12345"},
    "formAlias":"' . $formAlias . '",
    "language":"en",
    "country":"US",
    "policyTypes":["privacy"],
    "newsletterAccepted":true,
    "source":"US_MY-ACTIVATION_02-20"}';

echo "Sending...";

$output = sendSignedRequest("POST", "/client/applications/" . $appId . "/form-submissions", "", $jsonBody);

echo "Received: " . $output . "\n";

?>
