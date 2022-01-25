# JAVA

## List of examples

### 1. Client Form Submission
Submits a Form containing consumer data using the Client API.

REST documentation: [SubmitForm](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/Form%20Submission/submitForm)

### 2. Client Create User

Registers a User using the Client API.

REST documentation: [CreateUser](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/User/createUser)

### 3. Client Find a User

Finds an existing User using the Client API.

REST documentation: [GetUsers](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/User/getUsers)

### 4. Verify the signature of a Custom Notification

Verifies that the Custom Notification comes from UIM.

Documentation: https://platformservices.redbull.com/docs/uim-webhook

### 5. Get a Form Submission with Form API key authentication

Get a Form Submission using the Form API key for authentication.

REST documentation: [GetFormSubmissions](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/Form%20Submission/getFormSubmissions)

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
