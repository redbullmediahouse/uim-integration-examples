# Client Form Submission
Submits a form containing consumer data using the Client API.

File: `form-submission.js`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-create

## Setup the development environment
### 1. Build the container
`docker build -t <your username>/node-web-app .`
 
### 2. Run the docker image
`docker run --rm --name js-form-submissionq -e "APPLICATION_ID=<your_app_id>" -e "API_KEY=<your_api_key>" -e "ENVIRONMENT=design" <your username>/node-web-app`
 
## Optional: Execute the script manually (instead of running the docker image) 
`node src/form-submission.js`

## <a name="variables">Variables</a>

The variables you would need to run this example against the `design` environment are:
* `APPLICATION_ID`
* `API_KEY`

Please request them from the UIM team. In case you want to move to `production`, please request a new set of `Application ID`, `API Key` and `Form alias` for it.
