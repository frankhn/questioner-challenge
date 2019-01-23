import uuid from 'uuid';
import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import meetups from '../models/meetup';
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
  Database.executeQuery("SELECT * FROM meetup_table")
    .then(meetups=>{
     return res.status(200).json({
       msg: "cool",
       total:meetups.rowCount,meetups:meetups.rows
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
      const result = db.query(`INSERT INTO meetup_table(location,topic,happening_on,image_name)
      VALUES('${req.body.location}','${req.body.topic}','${req.body.happening_on}','${req.body.image_name}')returning *;`);
      res.status(201).json({
        status: 201,
        msg: 'you successfully created a Meetup',
        object: result,
      });
}
/**
 * 
 * @param {*the id for a meetup to be deleted} req 
 * @param {*true if meetup exits and deletes the meetup} res 
 */

deleteMeetup(req, res) {
  const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
    confirm.then((question)=>{
      if(question.rows === undefined || question.rows.length == 0){
        return res.status(404).json({msg: "meetup not found"});
      } else{
        db.query(`DELETE FROM meetup_table where id = ${req.params.meetupId}returning *;`)
         .then (deletedMeetup => {
             return res.status(202).send({
                 "status": 202,
                 "success": "received and marked for deletion",
 });
 }).catch( error => {
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
rsvp(req, res) {
	const confirm = db.query(`SELECT * FROM meetup_table where id = ${req.params.meetupId}`);
    confirm.then((question)=>{
      if(question.rows === undefined || question.rows.length == 0){
        return res.status(404).json({msg: "meetup not found"});
      } else{
        db.query(`INSERT INTO rsvp_table(user_id,meetup_id)
        VALUES('1','${req.params.meetupId}')returning *;`)
         .then (rsvp => {
             return res.status(201).send({
                 "status": 201,
                 "success": "thanks for response",
 });
 }).catch( error => {
   res.status(501).json({
       msg: "server error has occured "
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
        return res.status(404).json({msg: "meetup not found"});
      } else{
        res.status(200).json({
          total:meetup.rowCount,meetup:meetup.rows
        })
}
})
}
}

const meetupControllers = new meetupController();
module.exports = meetupControllers;
