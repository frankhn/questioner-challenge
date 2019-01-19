const express = require('express');
const meetupControllers = require('../controllers/meetup') 
const questionControllers = require('../controllers/question')
const routers = express.Router();


routers.get('/meetups', meetupControllers.allMeetup);//cool
routers.post('/meetups', meetupControllers.create);//cool
routers.post('/meetups/:meetupId/rsvp', meetupControllers.rsvp);//cool


routers.get('/meetups/:meetupId/questions', questionControllers.getQuestions);
routers.post('/meetups/:meetupId/questions', questionControllers.create);//cool
routers.patch('/questions/:questionId/downvote', questionControllers.downvote);
routers.patch('/questions/:questionId/upvote', questionControllers.upvote);
routers.post('/questions/:questionId/comments', questionControllers.creatComment);
routers.get('/meetups/:meetupId', meetupControllers.getsingleMeetup);
routers.delete('/meetups/:meetupId', meetupControllers.deleteMeetup);

module.exports = routers;
