const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const meetups = require('../models/meetup');

const Joi = BaseJoi.extend(Extension);

class meetupController {
  // get all meetups
  allMeetup(req, res) {
  res.status(200).json({
    status: 200,
    data: meetups,
  });
}// end of get all meetups



create(req, res) {
  const id = meetups.length + 1;

  const today = new Date().toLocaleDateString();

  const schema = Joi.object().keys({
    id: Joi.number().default(id),
    createdOn: Joi.date().default(today, 'time of creation'),
    location: Joi.string().min(3).max(20).required(),
    images: Joi.string().required(),
    topic: Joi.string().min(3).max(20).required(),
    happeningOn: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).raw(),
    tags: Joi.string().min(3).max(30).required(),
  });
  Joi.validate(req.body, schema, (err, result) => {
    if (!err) {
      meetups.push(result);
      res.status(201).json({
        status: 201,
        msg: 'you successfully created a Meetup',
        object: result,
      });
    } else {
      res.status(404).json({
        status: 404,
        msg: 'invalid inputs:please make sure you insert valid data',
      });
    }
  });
}// end of create a meetup


}
const meetupControllers = new meetupController();
module.exports = meetupControllers;
