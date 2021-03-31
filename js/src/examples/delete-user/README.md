# Delete a user
Deletes a user using the API.

File: `delete-user.js`

## Setup the development environment
### 1. Build the container
`docker build -t <your username>/node-web-app .`

### 2. Run the docker image
`docker run --rm --name delete-user -p 49160:8080 -e "APPLICATION_ID=<your_app_id>" -e "SILO_USER_ID=<uimUserId>" -e "API_KEY=<your_api_key>" -e "ENVIRONMENT=design" <your username>/node-web-app`

## Optional: Execute the script manually (instead of running the docker image) 
`node src/delete-user.js`

## Variables

The variables you would need to run this example against the `design` environment are:
* `APPLICATION_ID`
* `API_KEY`
* `SILO_USER_ID`
