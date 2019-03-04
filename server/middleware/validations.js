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
  const meetupSchema= Joi.object({
    location: Joi.string().min(3).max(20).required(),
    image_name: Joi.string().required().required(),
    topic: Joi.string().min(3).max(20).required(),
    happening_on: Joi.date().format(['YYYY/MM/DD', 'YYYY/M/D', 'DD-MM-YYYY']).required(),
  })
 const  questionSchema= Joi.object({
      title: Joi.string().min(5).max(15).required(),
      body: Joi.string().min(5).max(30).required(),
  })
 const loginSchema= {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };
 const signupSchema= Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      othername: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.number().integer().required(),
      username: Joi.string().min(5).max(12).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  })
  const subscribeSchema= Joi.object({
      email: Joi.string().email().required(),
  })
  const commmentSchema= Joi.object({
      content: Joi.string().min(6).max(20).required(),
  })
const  validationOptions= {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
  }

module.exports = {
    questionSchema,
    meetupSchema,
    loginSchema,
    signupSchema,
    subscribeSchema,
    commmentSchema,
    confirmMeetup,
    validationOptions,
    confirmQuestion
}