import uuid from 'uuid';
import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import { meetupSchema, questionSchema, validationOptions } from '../middleware/validations';
import confirmMeetup from '../middleware/validations';
import validater from '../middleware/validations';
import Database from '../models/connect';
import MeetupQuery from '../middleware/query';
import db from "../config/connection";
const Joi = BaseJoi.extend(Extension);

class meetupController {
 
/**
 * @param {get the meetup from the db} req 
 * @param {*return data if available} res 
 */

 async allMeetup(req, res) {
  db.query("SELECT * FROM meetup_table")
  .then(meetups=>{
    //total:meetups.rowCount
   return res.status(200).json({
     status: 200,
     data:meetups.rows
    });
  })
  .catch(err=>{
    console.log(err);
  })
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

async upComingMeetup(req, res) {
  db.query("SELECT * FROM meetup_table order by happening_on DESC")
    .then(meetups=>{
      //total:meetups.rowCount
     return res.status(200).json({
       status: 200,
       data:meetups.rows
      });
    })
    .catch(err=>{
      console.log(err);
    })
}

/**
 * 
 * @param {create a meetup} req 
 * @param {*returns success if created} res 
 */

async create(req, res) {
  const { error } = Joi.validate(req.body, meetupSchema, validationOptions);
  if (error) {
    const errorMessage = error.details.map(d => d.message);
    return res.status(400).send({
        status: 400,
        error: errorMessage
    });
  }
  console.log(req.body.happening_on)
      const result = db.query(`INSERT INTO meetup_table(location,topic,happening_on,image_name)
      VALUES('${req.body.location}','${req.body.topic}','${req.body.happening_on}','${req.body.image_name}') returning *;`)
      .then(meetup =>{
        res.status(201).json({
          status: 201,
          msg: 'you successfully created a Meetup',
          object: meetup.rows
      })
      });
}
/**
 * 
 * @param {*the id for a meetup to be deleted} req 
 * @param {*true if meetup exits and deletes the meetup} res 
 */


/**
 * 
 * @param {*the id for a meetup to be deleted} req 
 * @param {*true if meetup exits and deletes the meetup} res 
 */

deleteMeetup(req, res) {
  const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
    confirm.then((meetup)=>{
      if(meetup.rows === undefined || meetup.rows.length == 0){
        return res.status(404).json({message: "meetup not found"});
      } else{
        db.query(`DELETE FROM meetup_table where id = ${req.params.meetupId}returning *;`)
         .then (deletedMeetup => {
             return res.status(202).send({
                 "status": 200,
                 "message": "meetup deleted",
                 data: deletedMeetup.rows[0]
 });
 }).catch( error => {
   res.status(400).json({
     status: 400,
       message: "meetup not deleted"
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
rsvp(req, res) {
	const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
    confirm.then((meetup)=>{
      if(meetup.rows === undefined || meetup.rows.length == 0){
        return res.status(404).json({msg: "meetup not found"});
      } else{
        db.query(`INSERT INTO rsvp_table(user_id,meetup_id,status)
        VALUES('1','${req.params.meetupId}')returning *;`)
         .then (rsvp => {
             return res.status(201).send({
                 "status": 201,
                 data: [meetup.rows[0].id, meetup.rows[0].topic],
 });
 }).catch( error => {
   res.status(503).json({
     status: 503,
     message: "service unavailable "
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
getsingleMeetup(req, res) {
  const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
    confirm.then((meetup)=>{
      if(meetup.rows === undefined || meetup.rows.length == 0){
        return res.status(404).json({
          status: 404,
          message: "meetup not found"});
      } else{
        res.status(200).json({
          status:200,
         meetup:meetup.rows[0]
        })
}
})
}
async executescript(req, res) {
  const cre =Database.executeQuery("SELECT *from meetup_table")
    .then(meetups=>{
     return res.status(200).json({
       msg: "ready to go",
      });
    })
    .catch(err=>{
      console.log(err);
    })
}
}

const meetupControllers = new meetupController();
module.exports = meetupControllers;
