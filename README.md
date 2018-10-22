# Weather Powered Email App

This app contains a web interface that collects user input (email address, and location). It uses xmysl as the rest api for a mysql database to store the entries. It also contains a command line tool that takes an email address and queries the Dark Sky Weather API, to obtain historical data based on that time and location (down to the hour). Then it sends a custom email

### Prerequisites

- Docker

- Nodejs

### Installing

*Web Application*

Install docker and run this command in the root directory.

```
cd weather-app
docker-compose up
```

That's it. Visit `http://localhost:80` to see the app.

It will warn you when you don't have the correct environment variables set, when running docker.

```
MYSQL_USER -- User to sign in ass
MYSQL_ROOT_PASSWORD -- Root password, this will be set for root user and the user above
```


*Cli*

```
cd weather-app/cli
npm install
```

`./emailer send -e [email]`

You will also have to set the environment variables
`GMAIL_USER_ADDRESS`
`GMAIL_PASSWORD`
