const express = require('express');
const meetupControllers = require('../controllers/meetup') 
const routers = express.Router();


routers.get('/meetups', meetupControllers.allMeetup);//cool



module.exports = routers;
