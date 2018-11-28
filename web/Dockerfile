FROM alpine

RUN apk add curl
RUN apk add npm

RUN npm install -g yarn

ARG REACT_APP_MYSQL_TABLE_NAME
ARG REACT_APP_DB_URL

RUN mkdir -p /home/web
COPY . /home/web/

WORKDIR /home/web

RUN yarn install && yarn run build && rm -rf node_modules
RUN yarn global add serve
RUN rm -rf /home/web/node_modules

CMD ["serve", "-s", "/home/web/build"]
