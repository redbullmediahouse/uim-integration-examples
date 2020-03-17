FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY src .

EXPOSE 8080

CMD [ "node", "server.js" ]
