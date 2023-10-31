FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm install && \
    npm install express \
    npm install mysql \
    npm install faker


COPY . .

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

EXPOSE 3000
