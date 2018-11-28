FROM alpine

RUN apk add npm

ENV MYSQL_TABLE_NAME $MYSQL_TABLE_NAME
ENV WEB_SERVER_URL $WEB_SERVER_URL

COPY ./src /srv

WORKDIR /srv

RUN npm install

CMD ["npm", "run", "start", "--prefix /srv"]