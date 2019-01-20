const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const confirmMeetup = require('../middleware/validate');
const questions = require('../models/question');
const validateQuestion= require('../middleware/validateQuestions');
const validater = require('../middleware/validations')

class questionController{
    //get all questions that belong to a meetup
    getQuestions  (req, res){
    const findmeetup = confirmMeetup(req.params.meetupId);
    if (!findmeetup){
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
      Joi.validate(req.body, validater.questionSchema, validater.validationOptions, (err, result) => {
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
  

  // upvote a specific question
  upvote (req, res) {
    const quest = validateQuestion(req.params.questionId);
    if(!quest){
    res.status(404).json({
      status: 404,
      message: `the question does not exist`,
    });
  } else {
    //edit the upvote field
    quest.upvote += 1;
    res.status(200).json({
      status: 200,
      message: `you've successfully downvoted a question with id ${req.params.questionId}`,
      data: quest
    });
  }
  }// end of upvote a question.
  


  // create a comment
  creatComment  (req, res) {
    res.status(201).json({
      status: 201,
      msg: 'you successfully commented on a question',
    });
  }// comment




}



const questionControllers = new questionController();
module.exports = questionControllers;