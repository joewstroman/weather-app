FROM node:latest

RUN npm install -g xmysql
COPY wait-for-db.sh /

RUN chmod 777 /wait-for-db.sh
ENV MYSQL_ROOT_PASSWORD ${MYSQL_ROOT_PASSWORD}
ENV MYSQL_USER ${MYSQL_USER}
CMD [ "./wait-for-db.sh", "db", "xmysql -u me -p lala -h db -d weather" ]
