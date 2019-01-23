import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
//import confirmMeetup from '../middleware/validations';
import questions from '../models/question';
import validateQuestion from '../middleware/validations';
import validation from '../middleware/validations';
import db from "../config/connection";

const Joi = BaseJoi.extend(Extension);

class questionController{
    
  /**
     * 
     * @param {* meetup id } req 
     * @param {* questions} res 
     */
    
    getQuestions  (req, res){
      const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
      confirm.then((questions)=>{
        if(questions.rows === undefined || questions.rows.length == 0){
          return res.status(404).json({msg: "meetup not found"});
        } else{
          db.query(`SELECT * FROM question_table where meetup_id =${req.params.meetupId}`)
           .then ((newUser) => {
            if(newUser.rows === undefined || newUser.rows.length == 0){
              return res.status(200).json({msg: "this meetup has no questions yet!"});
            } else{
              return res.status(200).json({
                total:newUser.rowCount,newUser:newUser.rows
              });
              
            }
   }).catch( error => {
     console.log(error);
     res.status(500).json({
         msg: "an error has occured please make sure u insert valid contents"
     })
   })
   }
  })  
  };
  
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

  create (req, res) {
    const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
    confirm.then((question)=>{
      if(question.rows === undefined || question.rows.length == 0){
        return res.status(404).json({msg: "meetup not found"});
      } else{
        db.query(`INSERT INTO question_table(created_by,meetup_id,title,body)
        VALUES('1','${req.params.meetupId}','${req.body.title}','${req.body.body}')returning *;`)
         .then (newUser => {
             console.log(newUser);
             return res.status(201).send({
                 "status": 201,
                 "success": "you have successfully a question",
 });
 }).catch( error => {
   console.log(error);
   res.status(500).json({
       msg: "an error has occured please make sure u insert valid contents"
   })
 })
 }
}) 
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

downvote (req, res)  {
  const confirm = db.query(`SELECT * FROM question_table where id = ${req.params.questionId}`);
  confirm.then((question)=>{
    if(question.rows === undefined || question.rows.length == 0){
      return res.status(404).json({msg: "question not found"});
    } else {
      db.query(`INSERT INTO vote_table(user_id,quesion_id,status)
       VALUES('1','${req.params.questionId}','1')returning *;`)
        .then (newVote => {
            console.log(newVote);
            return res.status(201).send({
                "status": 201,
                "success": "you have downVoted a question",
});
}).catch( error => {
  console.log(error);
  res.status(500).json({
      msg: "an error has occured"
  })
})
}
})
}
  
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 
  upvote (req, res) {
    const confirm = db.query(`SELECT * FROM question_table where id = ${req.params.questionId}`);
  confirm.then((question)=>{
    //console.log(question.rows);
    if(question.rows === undefined || question.rows.length == 0){
      return res.status(404).json({msg: "question not found"});
    } else {
      
      db.query(`INSERT INTO vote_table(user_id,quesion_id,status)
       VALUES('1','${req.params.questionId}','1')returning *;`)
        .then (newVote => {
            console.log(newVote);
            return res.status(201).send({
                "status": 201,
                "success": "you have upvoted a question",
});
}).catch( error => {
  console.log(error);
  res.status(500).json({
      msg: "an error has occured"
  })
})
}
})
}  

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

creatComment(req, res) {
  const confirm = db.query(`SELECT * FROM question_table where id = ${req.params.questionId}`);
confirm.then((question)=>{
  //console.log(question.rows);
  if(question.rows === undefined || question.rows.length == 0){
    return res.status(404).json({msg: "question not found"});
  } else {
    db.query(`INSERT INTO comment_table(user_id,question_id,body)
     VALUES('1','${req.params.questionId}','${req.body.body}')returning *;`)
      .then (newVote => {
          return res.status(201).send({
              "status": 201,
              "success": "you have commented on a question",
});
}).catch( error => {
console.log(error);
res.status(500).json({
    msg: "an error has occured"
})
})
}
})
}
}
const questionControllers = new questionController();
module.exports = questionControllers;