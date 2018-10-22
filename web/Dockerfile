FROM debian:latest

RUN apt-get update
RUN apt-get install -y git curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

RUN mkdir -p /home/web
COPY . /home/web/

WORKDIR /home/web

RUN yarn install
RUN yarn run build
RUN yarn global add serve

CMD ["serve", "-s", "/home/web/build"]