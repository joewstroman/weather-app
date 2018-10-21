# #!/usr/bin/env bash

# set -e

# host="$1"
# shift
# cmd="$@"

# echo [mysql] > ~/.my.cnf
# echo user = root >> ~/.my.cnf
# echo password = $MYSQL_PASSWORD >> ~/.my.cnf

# until ping -c1 db &>/dev/null; do
#   >&2 echo "MYSQL is unavailable - sleeping"
#   sleep 10
# done

# >&2 echo "MYSQL is up - executing command"
# exec $cmd

set -e

until nc -z -v -w30 $DB_HOST 3306
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

echo "Mysql is up - executing command"
xmysql -h $DB_HOST -p $DB_PASSWORD -d $DB_NAME -u $DB_USER -n 80 -r 0.0.0.0
