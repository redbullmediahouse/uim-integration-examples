# JAVA

## List of examples

### 1. Client Form Submission
Submits a Form containing consumer data using the Client API.

File: `src/main/java/examples/UimJavaExample.java`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-create

## Setup the development environment
### 1. Build the container
`./gradlew clean jar dockerBuildImage`
 
### 2. Run the container
`docker run -e APP_ID=<appId> -e API_KEY=<apiKey> -e FORM_ALIAS=<formAlias> -e ENVIRONMENT=design uim-client-java-examples:latest <command>`

Possible `command` values are
* `form-submission`
* `create-user`
* `custom-notification-verification`

## Variables

The variables you would need to run this example against the `design` environment are:
* `Application ID`
* `API Key`
* `formAlias`

Please request them from the UIM team. In case you want to move to `production`, please request a new set of `Application ID`, `API Key` and `Form alias` for it.
