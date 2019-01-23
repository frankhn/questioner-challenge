import uuid from 'uuid';
import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import validater from '../middleware/validations';
import db from "../config/connection";
import bcrypt  from 'bcryptjs'
import jwt from  'jsonwebtoken'
const Joi = BaseJoi.extend(Extension);

class meetupController {
 
/**
 * 
 * @param {login user} req 
 * @param {*token on success} res 
 */


async login(req, res) {
  const confirm = db.query(`SELECT * FROM user_table where email = ${req.body.email}`);
  confirm.then((meetup)=>{
    if(meetup.rows === undefined || meetup.rows.length == 0){
      return res.status(404).json({msg: "user doen't exist"});
    } else{
        const hashePassword = db.query(`SELECT password FROM user_table where email=${req.body.email}`)
        console.log(hashePassword);
        const passwordValid = bcrypt.compareSync(req.body.password, hashePassword);
        if(passwordValid) {
            const user_id = db.query(`SELECT id FROM user_table where email=${req.body.email}`)
           console.log(user_id);
            const token = jwt.sign({ id: user_id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
        }
      res.status(200).json({
        total:meetup.rowCount,meetup:meetup.rows
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
                data: newUser.rows
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
