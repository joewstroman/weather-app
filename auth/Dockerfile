FROM node:latest

COPY ./src /srv

WORKDIR /srv

RUN npm install

CMD ["npm", "run", "start", "--prefix /srv"]