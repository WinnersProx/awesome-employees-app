## AWESOME EMPLOYEES  API

 This api helps to manage empployees but also providing so many other services to be discovered through the next sections.

## Features

### Implemented tasks

- Managers can sign up.
- A Manager can sign in if he has already activated his account.
- A manager can add a new employee and notify him via email
- A manager can edit the employee records
- A manager can suspend an employee 
- A manager can delete employee records.
- A manager should be able to search for an employee based on his position, name, email or phone number.
- An employee can reset his password by providing his email and verifying it

### To be implemented

- A manager should be able to upload an excel sheet containing a list of his employees and then send an email notifying uploaded employees that they've joined a company with the company name(To be implemented soon).

- The system should record all the manager's activities to comply with external audit requirements.

## API Endpoints

- Here are all Peculiar endpoints for the above features.

| Endpoint | Request | Status | Description |
| --- | --- | --- | --- |
| /api | GET | 200 OK | Access the root of the application |
| /api/auth/signup | POST | 201 Created | Create a new manager |
| /api/auth/signin | POST | 200 OK | Sign in as a manager |
| /api/employees | POST | 201 OK | Create an employee bypassing infos from the documentation |
| /api/employees/:employee/activate | PUT | 200 OK | To activate an employee |
| /api/employees/:employee | PUT | 200 OK | To edit an employee |
| /api/employees/:employee/suspend | PUT | 200 OK | To suspend an employee |
| /api/employees/:employee | DELETE | 201 OK | To delete an employee |


## Getting Started With Local Tests

Note that you need to primarily set up development tools as for the below section then go through all of the following steps sequentially.

Make sure you install [Node.js](https://nodejs.org) and [Postgres](https://www.postgresql.org/) on your machine!

1. Clone the github repository [here](https://github.com/WinnersProx/awesome-employees-app) and rename `.env.sample` to `.env` file and defining your environement variable, 

2. Install all the dependencies by running the following command in your command line interface

```sh
    $ npm install
```

3. Create your database and make sure that it complies with the informations supplied in `./server/db.config.js` then in your command line run the command below :

```sh
    $ npm run migrate
```

4. Consider installing MailDev globally for local emails testing by running `npm i -g maildev` in your CLI , run `maildev` upon installation completion and use [this link](http://localhost:1080) to test your emails locally.


5. Once you're done, make sure that everything is up-to-date and start enjoying it by running the following command in your command line interface, Sweeet :
```sh
    $ npm start
```

or

```sh
	$ npm run start-dev
```

## Tools for Development

Tools used for development of this Application are:

- Framework: [Nodejs/Express](http://expressjs.io/)
- Code Editor/IDE: [VSCode](https://code.visualstudio.com)
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/) ,[Typescript](https://www.typescriptlang.org/)
- DBMS : [PostgreSQL](https://www.postgresql.org/)

## API Documentation

- Postman : [Api Documentation](https://documenter.getpostman.com/view/8469163/SWLiZ5x3?version=latest)

## Deployment
- Heroku : <Implementing...>

## Learning resources
- [Angular University](http://angular-university.io)
- [Pluralsight](http://app.pluralsight.com)

## Key Contributor

- Bihame Sikubwabo Vainqueur

## Acknowlegements

- Awesomity Lab : [Awesomity Lab](https://awesomity.rw)
