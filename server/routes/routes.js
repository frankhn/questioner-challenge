const express = require('express');
const meetupControllers = require('../controllers/meetup') 
const routers = express.Router();


routers.get('/meetups', meetupControllers.allMeetup);//cool
routers.post('/meetups', meetupControllers.create);//cool
routers.post('/meetups/:meetupId/rsvp', meetupControllers.rsvp);//cool


module.exports = routers;
