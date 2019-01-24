import express from 'express';
import meetupControllers from '../controllers/meetup' 
import questionControllers from '../controllers/question'
import userControllers from '../controllers/user'
import velification from '../middleware/velification'
const routers = express.Router();


routers.get('/meetups', meetupControllers.allMeetup);//cool
routers.post('/meetups',velification.verifyToken, meetupControllers.create);//cool
routers.post('/meetups/:meetupId/rsvp', meetupControllers.rsvp);//cool

routers.post('/auth/login', userControllers.login);
routers.post('/auth/signup', userControllers.register);

routers.get('/meetups/:meetupId/questions', questionControllers.getQuestions);
routers.post('/meetups/:meetupId/questions',velification.verifyToken, questionControllers.create);//cool
routers.patch('/questions/:questionId/downvote', questionControllers.downvote);
routers.patch('/questions/:questionId/upvote', questionControllers.upvote);
routers.post('/questions/:questionId/comments', velification.verifyToken, questionControllers.creatComment);
routers.get('/meetups/:meetupId', meetupControllers.getsingleMeetup);
routers.delete('/meetups/:meetupId',velification.verifyToken, meetupControllers.deleteMeetup);

module.exports = routers;
