import express from 'express';
import meetupControllers from '../controllers/meetup' 
import questionControllers from '../controllers/question'
import userControllers from '../controllers/user'
import verify from '../middleware/verification';
const routers = express.Router();


routers.get('/meetups', meetupControllers.allMeetup);
routers.get('/upcoming', meetupControllers.upComingMeetup);
routers.post('/meetups', verify.verifyToken,meetupControllers.create);
routers.post('/meetups/:meetupId/rsvp', meetupControllers.rsvp);

routers.post('/auth/login', userControllers.login);
routers.post('/auth/signup', userControllers.register);

routers.get('/meetups/:meetupId/questions', questionControllers.getQuestions);
routers.post('/meetups/:meetupId/questions',verify.verifyToken, questionControllers.create);
routers.patch('/questions/:questionId/downvote',questionControllers.downvote);
routers.patch('/questions/:questionId/upvote', questionControllers.upvote);
routers.post('/questions/:questionId/comments', questionControllers.creatComment);
routers.get('/meetups/:meetupId', meetupControllers.getsingleMeetup);
routers.delete('/meetups/:meetupId',verify.verifyToken, meetupControllers.deleteMeetup);

routers.get('/execute', meetupControllers.executescript);

module.exports = routers;
