# C#

List of examples

## 1. Find a user

Finds a user using the Client API.

## Build the docker container

Inside the directory (corresponding to the example you want to try) execute the following:
`dotnet publish -c Release`

This will publish the C# code and prepare it for the dockerization.

Next, execute:

`docker build -t <DOCKER_IMAGE_NAME> -f Dockerfile .`

This will build the docker image (you have to choose a name yourself) using the Dockerfile.

## Execute the docker image

After a successful build, you can create the container and run the dockerized code:

`docker run -it --rm -e "SILO_USER_ID=<YOUR_SILO_USER_ID>" -e "APP_ID=<YOUR_APP_ID>" -e "API_KEY=<YOUR_API_KEY>" -e "ENVIRONMENT=<YOUR_ENVIRONMENT>" <DOCKER_IMAGE_NAME>`

The variables you would need to run this example against the `design` environment are:
* `SILO_USER_ID`
* `APPLICATION_ID`
* `API_KEY`
* `ENVIRONMENT` (this can either be `local`, `design` or `production`)
* `DOCKER_IMAGE_NAME` (this container name you chose)
