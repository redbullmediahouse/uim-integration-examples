# Client Custom Notification Verification
Verify the signature of a Custom Notification

File: `custom-notification-verification.js`

Documentation: https://platformservices.redbull.com/docs/uim-webhook

## Setup the development environment
### 1. Build the container
`docker build -t <your username>/node-web-app .`
 
### 2. Run the docker image
`docker run --rm --name js-custom-notification-verification <your username>/node-web-app`
 
## Optional: Execute the script manually (instead of running the docker image) 
`node src/custom-notification-verification.js`
