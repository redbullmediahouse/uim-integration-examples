FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src .
CMD ["node", "custom-notification-verification.js"]
