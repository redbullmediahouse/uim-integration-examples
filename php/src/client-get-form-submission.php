<?php

use Psr\Http\Message\StreamInterface;

require "vendor/autoload.php";

$formAlias = $_ENV["FORM_ALIAS"];
$apiKey = $_ENV["API_KEY"];
$environment = $_ENV["ENVIRONMENT"] ?? "design";

$formSubmissionId = "5e7b2f4324a6b105ca25e909";

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
    global $formAlias;
    global $apiKey;

    $params = [$formAlias, $requestMethod, $requestPath, $query, $acceptHeader, $body, $date];
    $rawSignature = implode("\n", $params);

    return base64_encode(hash_hmac("sha256", $rawSignature, $apiKey, true));
}

function createHmac($formAlias, string $signature): string
{
    $hmacSignature = "HMAC FORM:" . $formAlias . ":" . $signature;
    echo "FormAlias: " . $formAlias . "\n";
    echo "Signature: " . $hmacSignature . "\n";
    return $hmacSignature;
}

function callUim($method, $body, $formAlias, string $signature, string $url, string $acceptHeader, string $date): StreamInterface
{
    $hmacSignature = createHmac($formAlias, $signature);

    try {
        $client = new GuzzleHttp\Client();
        $response = $client->request($method, $url, ["headers" => ["Accept" => $acceptHeader,
            "UIM-Date" => $date,
            "Authorization" => $hmacSignature,
            "Content-Type" => "application/json; charset=utf-8"],
            "body" => $body]);
        return $response->getBody();
    } catch (\Exception $e) {
        echo "Received exception " . $e;
        return $e->getResponse()->getBody();
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
    global $formAlias;

    $acceptHeader = "application/vnd.rb.uim-v1+json";
    $date = currentDatetime();
    $base64Body = base64_encode($body);
    $signature = createSignature($method, $requestPath, $query, $acceptHeader, $base64Body, $date);

    $url = uimUrl($requestPath);
    if (!empty($query)) {
        $url .= "?" . $query;
    }

    return callUim($method, $body, $formAlias, $signature, $url, $acceptHeader, $date);
}

echo "Sending...";

$output = sendSignedRequest("GET", "/client/applications/" . $formAlias . "/form-submissions/" . $formSubmissionId, "", "");

echo "Received: " . $output . "\n";

?>