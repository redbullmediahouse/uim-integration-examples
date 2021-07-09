# C#

List of examples

## 1. Form Submission

Submits a Form containing consumer data using the Client API.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-create

## 2. Create a User
Submits registration data to create a user using the Client API.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-user-create-user

## 3. Find a user

Finds a user using the Client API.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-user-get-user

## 4. Verify the signature of a Custom Notification

Verifies that the Custom Notification comes from UIM.

Documentation: https://platformservices.redbull.com/docs/uim-webhook

## 5. Get a Form Submission with Form API key authentication

Get a Form Submission using the Form API key for authentication.

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-get

## Build the docker container

Inside the directory (corresponding to the example you want to try) execute the following:

`docker build -t <DOCKER_IMAGE_NAME> -f Dockerfile .`

This will build the docker image (you have to choose a name yourself) using the Dockerfile.

## Execute the docker image

After a successful build, you can create the container and run the dockerized code:

`docker run -it --rm -e "EXAMPLE=<EXAMPLE_YOU_WANT_TO_RUN>" -e "SILO_USER_ID=<YOUR_SILO_USER_ID>" -e "APP_ID=<YOUR_APP_ID>" -e "API_KEY=<YOUR_API_KEY>" -e "FORM_ALIAS=<YOUR_FORM_ALIAS>" -e "ENVIRONMENT=<YOUR_ENVIRONMENT>" <DOCKER_IMAGE_NAME>`

You can run the following examples:
* `form-submission`
* `create-user`
* `find-user`
* `custom-notification-verification`
* `get-form-submission`

The variables you would need to run these examples against the `design` environment are:
* `SILO_USER_ID` &rarr; for `find-user`
* `FORM_SUBMISSION_ID` &rarr; for `get-form-submission`
* `APPLICATION_ID` &rarr; for `form-submission`, `create-user`, `find-user`
* `API_KEY` &rarr; for `form-submission`, `create-user`, `find-user`
* `FORM_ALIAS` &rarr; for `form-submission`
* `ENVIRONMENT` (this can either be `local`, `design` or `production`) &rarr; for all except `custom-notification-verification`
* `DOCKER_IMAGE_NAME` (this container name you chose) &rarr; for all
