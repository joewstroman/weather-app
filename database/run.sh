mysql -u root -p$MYSQL_ROOT_PASSWORD << EOC
create database $MYSQL_DB_NAME;
use $MYSQL_DB_NAME;
create table $MYSQL_TABLE_NAME (
  email VARCHAR(255) not null UNIQUE,
  location text not null,
  longitude double not null,
  latitude double not null,
  time timestamp not null default NOW(),
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);
EOC

mysql -u root -p$MYSQL_ROOT_PASSWORD -e "use $MYSQL_DB_NAME; alter user '$MYSQL_USER' identified with mysql_native_password by '$MYSQL_PASSWORD';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "use $MYSQL_DB_NAME; alter user '$MYSQL_USER'@'%' identified with mysql_native_password by '$MYSQL_PASSWORD';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "use $MYSQL_DB_NAME; grant all on * to '$MYSQL_USER'@'%';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "use $MYSQL_DB_NAME; flush privileges;"
