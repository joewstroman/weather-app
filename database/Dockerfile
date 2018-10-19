FROM mysql:latest

ARG MYSQL_ROOT_PASSWORD
ENV MYSQL_ROOT_PASSWORD $MYSQL_ROOT_PASSWORD

RUN mkdir -p /home/mysql
RUN echo [mysql] > /home/mysql/.first.run.cnf
RUN echo user = root >> /home/mysql/.first.run.cnf
RUN echo password = $MYSQL_ROOT_PASSWORD >> /home/mysql/.first.run.cnf

RUN cat /home/mysql/.first.run.cnf
COPY commands.sql /docker-entrypoint-initdb.d
COPY run.sh /docker-entrypoint-initdb.d
