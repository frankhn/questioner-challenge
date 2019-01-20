const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const validater ={
  meetupSchema: Joi.object().keys({
    location: Joi.string().min(3).max(20).required(),
    images: Joi.string().required(),
    topic: Joi.string().min(3).max(20).required(),
    happeningOn: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).raw(),
    tags: Joi.string().min(3).max(30).required(),
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
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      othername: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().required(),
      username: Joi.string().min(5).max(12).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
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

module.exports = validater