FROM node:16.18.0

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY tsconfig.json ./

COPY . .

ENV NODE_PATH=./bin
ENV NODE_ENV %env%

EXPOSE 8082

CMD [ "npm","run","start:prod" ]