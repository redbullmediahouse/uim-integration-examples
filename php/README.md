# PHP

## List of examples

### 1. Client Form Submission
Submits a Form containing consumer data using the Client API.

File: `client-form-submission.php`

REST documentation: [SubmitForm](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/Form%20Submission/submitForm)

### 2. Client Create a User
Submits registration data to create a user using the Client API.

File: `client-create-user.php`

REST documentation: [CreateUser](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/User/createUser)

### 3. Client Find a User
Finds a user using the Client API.

File: `client-find-user.php`

REST documentation: [GetUsers](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/User/getUsers)

### 4. Client Get Form Submission
Gets a Form Submission using a form API key for authentication.

File: `client-get-form-submission.php`

REST documentation: [GetFormSubmissions](https://uim.redbull.com/uim/swagger-ui/index.html?url=https://uim.redbull.com/uim/api-docs/CLIENT_API#/Form%20Submission/getFormSubmissions)

### 5. Custom Notification Verification
Verify the signature of a Custom Notification.

File: `client-custom-notification-verification.php`

Documentation: https://platformservices.redbull.com/docs/uim-webhook

## Setup the development environment
### 1. Build the container
`docker build -t uim-client-php-examples .`
 
### 2. Connect to the container
`docker run -it --rm --entrypoint /bin/bash --name php-<example-name> -v "$PWD":/usr/src/myapp -e "APPLICATION_ID=<your_app_id>" -e "FORM_ALIAS=<your_form_alias>" -e "API_KEY=<your_api_key>" -e "ENVIRONMENT=design" uim-client-php-examples`

### 3. Download the dependencies (inside the container)
`composer install`
 
### 4. Execute the script
`php src/<script-name>.php`

Possible `script-name` values are
* `client-form-submission`
* `client-create-user`
* `client-find-user`
* `client-custom-notification-verification`
* `client-get-form-submission`

## Variables

The variables you would need to run this example against the `design` environment are:
* `Application ID` or `Form Alias`
* `API Key`

Please request them from the UIM team. In case you want to move to `production`, please request a new set of `Application ID`, `API Key` and `Form alias` for it.
