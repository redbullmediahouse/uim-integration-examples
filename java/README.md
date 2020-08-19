# JAVA

## List of examples

### 1. Client Form Submission
Submits a Form containing consumer data using the Client API.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-create

### 2. Client Create User

Registers a User using the Client API.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-user-create-user

### 3. Client Find a User

Finds an existing User using the Client API.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-user-get-user

### 4. Verify the signature of a Custom Notification

Verifies that the Custom Notification comes from UIM.

Documentation: https://platformservices.redbull.com/docs/custom-notifications

### 5. Get a Form Submission with Form API key authentication

Get a Form Submission using the Form API key for authentication.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-get

## Setup the development environment
### 1. Build the container
`./gradlew clean jar dockerBuildImage`
 
### 2. Run the container
`docker run -e "APP_ID=<appId>" -e "API_KEY=<apiKey>" -e "FORM_ALIAS=<formAlias>" -e "ENVIRONMENT=design" uim-client-java-examples:latest <command>`

Possible `command` values are
* `form-submission`
* `create-user`
* `find-user`
* `custom-notification-verification`
* `get-form-submission`

## Variables

The variables you would need to run this example against the `design` environment are:
* `Application ID`
* `API Key`
* `formAlias`

Please request them from the UIM team. In case you want to move to `production`, please request a new set of `Application ID`, `API Key` and `Form alias` for it.
