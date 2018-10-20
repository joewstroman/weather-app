#!/usr/bin/env bash

set -e

host="$1"
shift
cmd="$@"

echo [mysql] > ~/.my.cnf
echo user = root >> ~/.my.cnf
echo password = $MYSQL_ROOT_PASSWORD >> ~/.my.cnf

until curl $host:3306; do
  >&2 echo "MYSQL is unavailable - sleeping"
  sleep 10
done

>&2 echo "MYSQL is up - executing command"
exec $cmd