# questioner-challenge

[![Build Status](https://travis-ci.com/frankhn/questioner-challenge.svg?branch=develop)](https://travis-ci.com/frankhn/questioner-challenge)   [![Coverage Status](https://coveralls.io/repos/github/frankhn/questioner-challenge/badge.svg?branch=develop)](https://coveralls.io/github/frankhn/questioner-challenge?branch=develop)   [![Maintainability](https://api.codeclimate.com/v1/badges/73bc4ea5803f964ad6e2/maintainability)](https://codeclimate.com/github/frankhn/questioner-challenge/maintainability)

 Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.
 
 #TECHNOLOGY
 
  -NODE JS
  -POSTGESql
  -JWT (Javascript web token)
 
 
 #USAGE
 
 
 Using Node js download and install the latest version of of nodejs.

This Application is built in nodejs es6

To clone the respository and execute the following command.

 1. git clone https://github.com/frankhn/questioner-challenge.git

 2. git init (initialize an empty local repository)
 
 3.npm install
 
 4.change the .env file accordingly
 
 
 
 #RUNNING
 
 
 
 
 Once your done with installations and configuration for the database creadetials
 you can run npm start to start the application server.
 
Whether your using ***POSTMAN*** as a testing environment or your on a browser once you server is running you can locate a 
 URL at localhost:3000 from the you can access the application.


The Application uses the following URL mapping for accessing it's core functions 

***GET :   ?/api/v1/meetups: retrieves all the meetups available in the database

**POST:  ?/api/v1/meetups: inserting a new record of a meetup

***GET :  ?/api/v1/meetups/:id :returns a specific meetup

***GET :  ?/api/v1/meetups/:meetupId/questions : returns questions that belong to a meetup

***POST:  ?/api/v1/meetups/:meetupId/questions : create a question record 




#TESTING 



For testing You have to run 


***npm test***


#HOSTING

heroku: https://questioner-app-2019.herokuapp.com/

Thanks for reading...

