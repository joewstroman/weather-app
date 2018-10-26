# Weather Powered Email App

This app contains a web interface that collects user input (email address, and location). It uses xmysl as the rest api for a mysql database to store the entries. It also contains a command line tool that takes an email address and queries the Dark Sky Weather API, to obtain historical data based on that time and location (down to the hour). Then it sends a custom email

### Prerequisites

Docker
Nodejs

### Installing


Install docker.

```
cd weather-app
docker-compose up
```

That's it. Visit `http://localhost:80` to see the app.

The docker-compose up command initializes:

a web server - to access the weather app site,
a MYSQL database backend - to store the emails,
a restapi that exposes all parts of the specified database,
and an "auth" server which only exposes the email table as an endpoint and only allows connections from web server "localhost:80".

More comprehensive authentication can be implemented but the email app should allow unathenticated access by definition.

It will warn you when you don't have the correct environment variables set, when running docker.

```
MYSQL_USER -- User to sign in as
MYSQL_PASSWORD -- User and root password
MYSQL_DB_NAME -- Name of initial database
MYSQL_TABLE_NAME -- Table name to store emails and locations
```



*Cli*

```
cd weather-app/cli
npm install
```

`./emailer send -e [email]`
`./emailer send-all`

You will also need to set enviornment variables here:
```
DARK_SKY_API_KEY
GMAIL_USER_ADDRESS
GMAIL_PASSWORD
MYSQL_DB_HOST (localhost)
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DB_NAME
```