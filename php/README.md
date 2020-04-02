# PHP

## List of examples

### 1. Client Form Submission
Submits a Form containing consumer data using the Client API.

File: `client-form-submission.php`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-create

### 2. Client Create a User
Submits registration data to create a user using the Client API.

File: `client-create-user.php`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-user-create-user

### 3. Client Find a User
Finds a user using the Client API.

File: `client-find-user.php`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-user-get-user

## Setup the development environment
### 1. Build the container
`docker build -t uim-client-php-examples .`
 
### 2. Connect to the container
`docker run -it --rm --entrypoint /bin/bash --name php-form-submission -v "$PWD":/usr/src/myapp -e "APPLICATION_ID=<your_app_id>" -e "API_KEY=<your_api_key>" -e "ENVIRONMENT=design" uim-client-php-examples`

### 3. Download the dependencies (inside the container)
`composer install`
 
### 4. Execute the script
`php src/<script-name>.php`

## Variables

The variables you would need to run this example against the `design` environment are:
* `Application ID`
* `API Key`

Please request them from the UIM team. In case you want to move to `production`, please request a new set of `Application ID`, `API Key` and `Form alias` for it.
