# Client Get Form Submission
Gets a form submission using a form API key for authentication.

File: `get-form-submission.js`

REST documentation: https://uim.redbull.com/uim/resources/docs/rest-api.html#client-resources-form-submissions-get

## Setup the development environment
### 1. Build the container
`docker build -t <your username>/node-web-app .`
 
### 2. Run the docker image
`docker run --rm --name js-get-form-submission -e "FORM_ALIAS=<your_form_alias>" -e "API_KEY=<your_api_key>" -e "ENVIRONMENT=design" <your username>/node-web-app`
 
## Optional: Execute the script manually (instead of running the docker image) 
`node src/get-form-submission.js`

## <a name="variables">Variables</a>

The variables you would need to run this example against the `design` environment are:
* `FORM_ALIAS`
* `API_KEY`

Please request them from the UIM team. In case you want to move to `production`, please request a new set of `Form Alias` and `API Key` for it.
