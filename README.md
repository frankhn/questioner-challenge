
 
 # questioner-challenge
 
 
[![Build Status](https://travis-ci.com/frankhn/questioner-challenge.svg?branch=develop)](https://travis-ci.com/frankhn/questioner-challenge)  [![Coverage Status](https://coveralls.io/repos/github/frankhn/questioner-challenge/badge.svg?branch=develop)](https://coveralls.io/github/frankhn/questioner-challenge?branch=develop)   [![Maintainability](https://api.codeclimate.com/v1/badges/73bc4ea5803f964ad6e2/maintainability)](https://codeclimate.com/github/frankhn/questioner-challenge/maintainability)



 Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See Installation, Running and deployment for more details.
This Application is built in nodejs with es6.


### Prerequisites

Questioner is built in node js with ES6 format. to get up the application running you need to 
install the following
```
download the latest version of node js 
```

### Installing

A step by step series of examples that tell you how to get a development env running

You have to follow the follow this procedure to get started


You need POSTGRESQL for data persistance
```
install postgres and create  a database eg: questioner
```
got to the Version control and clone down the application
```
run git clone https://github.com/frankhn/questioner-challenge.git

```
run:  npm install

```
the server will automatically install all the needed packages in the application
```


You need a testing environment like POSTMAN

```
For getting data from the app you will have to access every single API endpoint
like  localhost:3000/api/v1/meetups
```
```Then you'll be able to get a bunch of JSON data:

See the example below: 

  "total": 2,
    "newUser": [
        {
            "id": 6,
            "created_on": "2019-01-23T18:13:13.531Z",
            "created_by": 1,
            "meetup_id": 6,
            "title": "sunday meetup",
            "body": "akhdjfaljdlf lasdlakj",
            "upvote": 0,
            "downvote": 0
        },
        {
            "id": 7,
            "created_on": "2019-01-23T18:13:15.627Z",
            "created_by": 1,
            "meetup_id": 6,
            "title": "sunday meetup",
            "body": "akhdjfaljdlf lasdlakj",
            "upvote": 0,
            "downvote": 0
        }
    ]
}
```
Whether your using ***POSTMAN*** as a testing environment or your on a browser, once your server is running you can locate a 
 URL at localhost:3000 from there you can access the application.


The Application uses the following URL mapping for accessing it's core functions 

***GET :   ?/api/v1/meetups: retrieves all the meetups available in the database

**POST:  ?/api/v1/meetups: inserting a new record of a meetup

***GET :  ?/api/v1/meetups/:id :returns a specific meetup

***GET :  ?/api/v1/meetups/:meetupId/questions : returns questions that belong to a meetup

***POST:  ?/api/v1/meetups/:meetupId/questions : create a question record 


## Running the tests

you'll also need to test the API endpoints
just run : npm test

### Break down into end to end tests

These tests, tests all the API endpoints and others responses to find if there really working and able to return the data as expected

```
like: api/v1/meetups
you have to make sure that the endpoint is able to return the specified data as expected that data has to be an object ant it status 200
```

## Deployment

You'll need to have a hosting account on you hosting provider
i would recommend HEROKU which is the hosting i used on this app, depending on you hosting provider you'll have go under certain processes to get the application up and running 

Demo:

heroku: https://questioner-app-2019.herokuapp.com/


You can read more on how to host a node js application on heroku https://devcenter.heroku.com/articles
## Built With

* [Node js]
