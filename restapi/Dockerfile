FROM markuman/xmysql:0.4.2

RUN npm install -g xmysql

COPY wait-for-db.sh /

RUN chmod 777 /wait-for-db.sh

ENV DB_HOST $DB_HOST
ENV DB_USER $DB_USER
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}

ENTRYPOINT [ "/bin/sh", "/wait-for-db.sh" ]

CMD [ "/wait-for-db.sh" ]
