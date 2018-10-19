create database weather;

use weather;

create table emails (
  email VARCHAR(255) not null PRIMARY KEY UNIQUE,
  location text not null,
  time timestamp not null default NOW()
);