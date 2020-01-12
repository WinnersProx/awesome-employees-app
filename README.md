## AWESOME EMPLOYEES  API

 This api helps to manage empployees but also providing so many other services to be discovered through the next sections.

## Features

- Managers can sign up.
- A Manager can sign in if he has already activated his account.
- A manager can edit, suspend an employee or delete employee records.
- A manager should be able to search for an employee based on his position, name, email or phone number.
- A manager should be able to upload an excel sheet containing a list of his employees and then send an email notifying uploaded employees that they've joined a company with the company name.
- The system should record all the manager's activities to comply with external audit requirements.

## API Endpoints

- Here are all Peculiar endpoints for the above features.

| Endpoint | Request | Status | Description |
| --- | --- | --- | --- |
| / | GET | 200 OK | Access the root of the application |
| /auth/signup | POST | 201 Created | Create a new manager |
| /auth/signin | POST | 200 OK | Sign in as a manager |
| /employees | POST | 201 OK | Create an employee bypassing infos from the documentation |
| /employees/:employee/activate | PUT | 200 OK | To activate an employee |
| /employees/:employee | PUT | 200 OK | To edit an employee |
| /employees/:employee/suspend | PUT | 200 OK | To suspend an employee |
| /employees/:employee | DELETE | 201 OK | To delete an employee |



## Tools for Development

Tools used for development of this Application are:
- Framework: [Nodejs/Express](http://expressjs.io/)
- Code Editor/IDE: [VSCode](https://code.visualstudio.com)
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/) ,[Typescript](https://www.typescriptlang.org/)
- DBMS : [PostgreSQL](https://www.postgresql.org/)

## Getting Started With Local Tests

- Note that you need to set up primarily The tools for development as for the above section then go through all of the below steps sequentially.

1. Clone the github repository [here](https://github.com/WinnersProx/rescuer-app-backend) and rename `.env.sample` to `.env` file and defining your environement variable, 

2. Install all the dependencies by running the following command in your command line interface

```sh
    $ npm install
```

3. Create your database and make sure that it complies with the informations supplied in `./server/db.config.js` then in your command line run the command below :

```sh
    $ npm run seeder
```

4. Once you're done making sure that everything is up-to-date, start enjoying it by running the following command in your command line interface and that's it :
```sh
    $ npm start
```
or

```sh
	$ npm start-dev
```

## Deployment
- Heroku : https://rescuer-api.herokuapp.com/api/v1/

## Learning resources
- [Angular University](http://angular-university.io)
- [Pluralsight](http://app.pluralsight.com)

## Key Contributor

- Bihame Sikubwabo Vainqueur

## Acknowlegements

- Awesomity Lab : [Awesomity Lab](https://awesomity.rw)
