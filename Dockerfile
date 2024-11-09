FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src/ ./src

COPY .env ./

EXPOSE 3000

CMD ["node", "src/server.js"]
