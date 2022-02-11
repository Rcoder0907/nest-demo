## Description

This is the test task submitted against the problem statement which asks to create a backend server having couple of apis.

The complete project is NEST based. The code is organised with following design patterns: 

- Singleton pattern
- Factory pattern
- Dependency injection
- SOLID principle
- DRY

## Installation

The project dependency can be installed using
```bash
$ yarn
```

Ensure you have docker installed. The database postgres is installed using `docker-compose`. 
- Install docker via official site and start the same
- Visit the root directory of project
- `docker-compose -d up` to start postgres in a docker container
- If you don't want to use docker based database then go to .env file and update the credential of database server of your own



## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

For simplicity the test part has not been taken care in this task

## Endpoints
Api documents has been maintained over Postman and the same can be accessed via this url
https://documenter.getpostman.com/view/12590258/UVeMJiuY

<iframe
  src="https://documenter.getpostman.com/view/12590258/UVeMJiuY"
  style="width:100%; height:1800px;"
></iframe>
