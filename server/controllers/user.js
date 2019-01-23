import uuid from 'uuid';
import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import validater from '../middleware/validations';
import db from "../config/connection";
const Joi = BaseJoi.extend(Extension);

class meetupController {
 
/**
 * 
 * @param {login user} req 
 * @param {*token on success} res 
 */


async login(req, res) {
    
}
/**
 * 
 * @param {create a meetup} req 
 * @param {*returns success if created} res 
 */
async register(req, res) {
       db.query(`INSERT INTO user_table(firstname,lastname,othername,email,phone_number,username,password)
       VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.othername}','${req.body.email}','${req.body.phone_number}','${req.body.username}','${req.body.password}')returning *;`)
        .then (newUser => {
            return res.status(201).send({
                "status": 201,
                "success": "you have successfully created an account",
});
}).catch( error => {
  console.log(error);
  res.status(500).json({
      msg: "an error has occured please make sure u insert valid contents"
  })
})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async logout(req, res) {
    
}

};
const meetupControllers = new meetupController();
module.exports = meetupControllers;
