import uuid from 'uuid';
import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import validater from '../middleware/validations';
import db from "../config/connection";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const Joi = BaseJoi.extend(Extension);

class meetupController {
 
/**
 * 
 * @param {login user} req 
 * @param {*token on success} res 
 */


async login(req, res) {
    const email =req.body.email;
    const password =req.body.password;
    db.query('SELECT email FROM user_table WHERE email = $1', [email])
    .then((user) =>{
      if(user.rows === undefined || user.rows.length == 0){
        return res.status(404).json({msg: "invalid credentials"});
      } else{
       res.status(200).json({
         msg: 'your done'
       })
}
    })
     

}
/**
 * 
 * @param {create a meetup} req 
 * @param {*returns success if created} res 
 */
async register(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
       db.query(`INSERT INTO user_table(firstname,lastname,othername,email,phone_number,username,password)
       VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.othername}','${req.body.email}','${req.body.phone_number}','${req.body.username}','${hashedPassword}')returning *;`)
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
