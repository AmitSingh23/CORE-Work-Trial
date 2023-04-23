
FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .

ENV APP_NAME=telemetry-producer
CMD ["npm", "run", "start", "${APP_NAME}"]

EXPOSE 3000