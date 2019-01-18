const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const confirmMeetup = require('../middleware/validate');
const questions = require('../models/question');
const validateQuestion= require('../middleware/validateQuestions');


class questionController{
    //get all questions that belong to a meetup
    getQuestions  (req, res){
    const findmeetup = confirmMeetup(req.params.meetupId);
    if (!findmeetup) {
      res.status(404).json({
        status: 404,
        msg: "the meetup does not exist"
      });
    } else {
      const meetupquestions = questions.filter( questions => questions.meetup === req.params.meetupId);
      //console.log(meetupquestions);
      if(meetupquestions.length){
        res.status(200).json({
      status: 200,
      data: meetupquestions,
    });
      } else {
       
        res.status(200).json({
          msg: 'this meetup has no questions yet'
        });  
      }
      
  }
  }
  // create a question record
  create (req, res) {
    const findmeetup = confirmMeetup(req.params.meetupId);
    if (!findmeetup) {
      res.status(404).json({
        status: 404,
        msg: 'the meetup does not exist',
      });
    } else { 
      const id = questions.length + 1;
      const today = new Date().toLocaleDateString();
      const schema = Joi.object().keys({
        id: Joi.number().default(id),
        createdOn: Joi.date().default(today, 'time of creation'),
        createdBy: Joi.number().default(id),
        meetup: Joi.number().default(req.params.meetupId),
        title: Joi.string().min(3).max(20).required(),
        bodyy: Joi.string().min(10).max(50).required(),
      });
      Joi.validate(req.body, schema, (err, result) => {
        if (!err) {
          questions.push(result);
          res.status(201).json({
            status: 201,
            msg: 'you successfully created a question',
            object: result,
          });
        } else {
          res.status(404).json({
            status: 404,
            msg: 'invalid inputs:please make sure you insert valid data',
          });
        }
      });
    }
  }// end of ask a question



  // downvote a specific question
downvote (req, res)  {
    const quest = validateQuestion(req.params.questionId);
    if(!quest){
    res.status(404).json({
      status: 404,
      message: `the question does not exist`,
    });
  } else {
    //edit the downvote field
    //console.log(quest);
    quest.downvote += 1;
    //console.log(quest);
    res.status(200).json({
      status: 200,
      message: `you've successfully downvoted a question with id ${req.params.questionId}`,
      data: quest
    });
  }
  }// end of downvote a question.
  



}



const questionControllers = new questionController();
module.exports = questionControllers;