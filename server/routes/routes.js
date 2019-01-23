import express from 'express';
import meetupControllers from '../controllers/meetup' 
import questionControllers from '../controllers/question'
import userControllers from '../controllers/user'
const routers = express.Router();


routers.get('/meetups', meetupControllers.allMeetup);//cool
routers.post('/meetups', meetupControllers.create);//cool
routers.post('/meetups/:meetupId/rsvp', meetupControllers.rsvp);//cool

routers.post('/users/auth', userControllers.login);
routers.post('/users/register', userControllers.register);

routers.get('/meetups/:meetupId/questions', questionControllers.getQuestions);
routers.post('/meetups/:meetupId/questions', questionControllers.create);//cool
routers.patch('/questions/:questionId/downvote', questionControllers.downvote);
routers.patch('/questions/:questionId/upvote', questionControllers.upvote);
routers.post('/questions/:questionId/comments', questionControllers.creatComment);
routers.get('/meetups/:meetupId', meetupControllers.getsingleMeetup);
routers.delete('/meetups/:meetupId', meetupControllers.deleteMeetup);

module.exports = routers;
