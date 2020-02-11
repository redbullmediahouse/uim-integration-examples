# PHP

## List of examples

### 1. Client Form Submission
Submits a Form containing consumer data using the Client API.

File: `client-form-submission.php`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-create

## Setup the development environment
### 1. Build the container
`docker build -t uim-client-php-examples .`
 
### 2. Connect to the container
`docker run -it --rm --entrypoint /bin/bash --name php-form-submission -v "$PWD":/usr/src/myapp -e "APPLICATION_ID=<your_app_id>" -e "API_KEY=<your_api_key>" -e "ENVIRONMENT=design" uim-client-php-examples`

### 3. Download the dependencies (inside the container)
`composer install`
 
### 4. Execute the script
`php src/client-form-submission.php`
