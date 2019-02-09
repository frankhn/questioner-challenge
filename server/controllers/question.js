import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import { commmentSchema, questionSchema, validationOptions } from '../middleware/validations';
import questions from '../models/question';
import validateQuestion from '../middleware/validations';
import validation from '../middleware/validations';
import db from "../config/connection";
import jwt from 'jsonwebtoken'
import parseJson from 'parse-json';

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
          return res.status(404).json({status: 404, message:"meetup not found"});
        } else{
          console.log(questions.rows[0].id)
          db.query(`SELECT * FROM question_table where meetup_id =${questions.rows[0].id}`)
           .then ((newUser) => {
            if(newUser.rows === undefined || newUser.rows.length == 0){
              console.log(questions.rows[0].id)
              return res.status(404).json({status: 404, message: "this meetup has no questions yet!"});
            } else{
              return res.status(200).json({
                status: 200,
                data:newUser.rows
              });
              
            }
   }).catch( error => {
     console.log(error);
     res.status(400).json({
         message: "bad request"
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
    const { error } = Joi.validate(req.body, questionSchema, validationOptions);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
          status: 400,
          error: errorMessage
      });
    } 
    
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
     
      jwt.verify(req.token, 'secretkey', (err, data) => {
        console.log(data)
       // const user = JSON.parse(data);
       const user = parseJson(data.user);
        console.log(user); 

        const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
        confirm.then((question)=>{
          if(question.rows === undefined || question.rows.length == 0){
            return res.status(404).json({status: 404 ,message: "meetup not found"});
          } else{
            
            console.log(question.rows[0].id)
            db.query(`INSERT INTO question_table(created_by,meetup_id,title,body)
            VALUES('${user}','${req.params.meetupId}','${req.body.title}','${req.body.body}')returning *;`)
             .then (newUser => {
                 //console.log(newUser);
                 return res.status(201).send({
                     "status": 201,
                     message: data,
                     data: newUser.rows[0],
     });
     }).catch( error => {
       console.log(error);
       res.status(400).json({
           status: 400,
           message: "bad request"
       })
     })
     }
    })


      })
    }
   
 
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

downvote (req, res)  {
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
   
    jwt.verify(req.token, 'secretkey', (err, data) => {
      //console.log(data)
     // const user = JSON.parse(data);
     const user = parseJson(data.user);
      // console.log("user id =",user); 
      const qID = req.params.questionId;
      const confirm = db.query(`SELECT * FROM question_table where id = ${qID}`);
      confirm.then((question)=>{
        if(question.rows === undefined || question.rows.length == 0){
          return res.status(404).json({status: 404, message: "question not found"});
        } else {
          db.query(`SELECT *FROM upvote_table where user_id=${user} and quesion_id = ${qID}`)
          .then(hasUpvoted =>{
            if(hasUpvoted.rows === undefined || hasUpvoted.rows.length == 0){
              const hasUser = db.query(`SELECT *FROM downvote_table where user_id=${user} and quesion_id = ${qID}`)
          .then(hasdownvoted =>{
            if(!hasdownvoted.rows === undefined || !hasdownvoted.rows.length == 0){
              return res.status(200).json({
                status: "200",
                message: "you have already downvoted"
              })
            } else {
              db.query(`INSERT INTO downvote_table(user_id,quesion_id,votes)
            VALUES('${user}','${req.params.questionId}','1')returning *;`)
             .then (newVote => {
                 // console.log(newVote);
                 return res.status(201).send({
                     "status": 201,
                     data: newVote.rows[0],
     });
     }).catch( error => {
       console.log(error);
       res.status(400).json({
           message: "bad request"
       })
     })
     const currentDownVotes = db.query(`SELECT SUM(votes) FROM downvote_table where quesion_id =${req.params.questionId};`)
          .then(summation =>{
            const sum = summation.rows[0].sum;
            console.log("the sum of current downvotes",sum)
            const quetioVot =parseInt(sum);
            console.log("new sum of downvote", quetioVot)
            db.query(`UPDATE question_table SET downvote = ${quetioVot} WHERE id = ${qID}`)
            return sum;
          })
            }
          })
            } else{
              res.status(200).json({
                status: "200",
                message: "an upvote exist"
              })
            }
            
     
          })
          
    }
    })

    
    })
  }
  
}
  
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 
  
upvote (req, res)  {
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
   
    jwt.verify(req.token, 'secretkey', (err, data) => {
      //console.log(data)
     // const user = JSON.parse(data);
     const user = parseJson(data.user);
      // console.log("user id =",user); 
      const qID = req.params.questionId;
      const confirm = db.query(`SELECT * FROM question_table where id = ${qID}`);
      confirm.then((question)=>{
        if(question.rows === undefined || question.rows.length == 0){
          return res.status(404).json({status: 404, message: "question not found"});
        } else {
          db.query(`SELECT *FROM downvote_table where user_id=${user} and quesion_id = ${qID}`)
          .then(hasdownvoted =>{
            if(hasdownvoted.rows === undefined || hasdownvoted.rows.length == 0){
              const hasUser = db.query(`SELECT *FROM upvote_table where user_id=${user} and quesion_id = ${qID}`)
          .then(hasupvoted =>{
            if(!hasupvoted.rows === undefined || !hasupvoted.rows.length == 0){
              return res.status(200).json({
                status: "200",
                message: "you have already upvoted"
              })
            } else {
              db.query(`INSERT INTO upvote_table(user_id,quesion_id,votes)
            VALUES('${user}','${req.params.questionId}','1')returning *;`)
             .then (newVote => {
                 // console.log(newVote);
                 return res.status(201).send({
                     "status": 201,
                     data: newVote.rows[0],
     });
     }).catch( error => {
       console.log(error);
       res.status(400).json({
           message: "bad request"
       })
     })
     const currentDownVotes = db.query(`SELECT SUM(votes) FROM upvote_table where quesion_id =${req.params.questionId};`)
          .then(summation =>{
            const sum = summation.rows[0].sum;
            console.log("the sum of current upvotes",sum)
            const quetioVot =parseInt(sum);
            console.log("new sum of upvote", quetioVot)
            db.query(`UPDATE question_table SET upvote = ${quetioVot} WHERE id = ${qID}`)
            return sum;
          })
            }
          })
            } else{
              res.status(200).json({
                status: "200",
                message: "a downvote exist"
              })
            }
            
     
          })
          
    }
    })

    
    })
  }
  
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
              data: [question.rows[0].meetup_id, question.rows[0].title],
              body: newVote.rows[0]
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