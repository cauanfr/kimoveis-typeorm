FROM node:19.0

WORKDIR /app

COPY package.json /app/

RUN yarn

COPY . /app/
