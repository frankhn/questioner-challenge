import BaseJoi from 'joi'
import db from '../config/connection'
import Extension from 'joi-date-extensions'
// import meetups from '../models/meetup'
//import questions from '../models/question'
const Joi = BaseJoi.extend(Extension);


 /**
  * 
  * @param {define and validate the meetup existance} meetupId 
  */

const confirmMeetup = (meetupId) =>{ 
    const confirm = db.query(`SELECT *FROM meetup_table where id = ${meetupId}`)
    //meetups.find(c => c.id === parseInt(meetupId, 10));
	//radix parameter  number representing mathematic number base parameter
	if (confirm) return confirm;
};

 /**
  * 
  * @param {define and validate the question's existence} questionId 
  */

const confirmQuestion    = (questionId) =>{ 
	const confirm = db.query(`SELECT *FROM question_table where id = ${questionId}`)
	if (confirm) return confirm;
};

/**
 * mapping the meetup 
 */
const validation ={
  meetupSchema: Joi.object().keys({
    location: Joi.string().min(3).max(20).required(),
    image_name: Joi.string().required(),
    topic: Joi.string().min(3).max(20).required(),
    happeningOn: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
  }),
  questionSchema: Joi.object().keys({
      title: Joi.string().min(5).max(15),
      bodyy: Joi.string().min(5).max(30),
  }),
  loginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),
  signupSchema: Joi.object().keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      othername: Joi.string(),
      email: Joi.string().email(),
      phone_number: Joi.number().integer(),
      username: Joi.string().min(5).max(12),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  }),
  subscribeSchema: Joi.object().keys({
      email: Joi.string().email().required(),
  }),
  commmentSchema: Joi.object().keys({
      content: Joi.string().min(6).max(20).required(),
  }),
  validationOptions: {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
  },
}

module.exports = {
    validation,
    confirmMeetup,
    confirmQuestion
}