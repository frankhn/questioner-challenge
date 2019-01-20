import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import meetups from '../models/meetup';
import confirmMeetup from '../middleware/validate';

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


// delete a meetup record
deleteMeetup(req, res) {
  const findmeetup = confirmMeetup(req.params.meetupId);
  const meetupId = req.params.meetupId;
  if (findmeetup) {
    const filteredMeetups = meetups.filter(meetup => meetup !== meetups.indexOf);
    res.status(202).json({
      status: 202,
      msg: 'resource accepted and marked for deletion',
      data: filteredMeetups
    });
  } else { res.status(404).json({ status: 404, msg: 'meetup not found' }); }
}// end of delete a meetup // object accepted for deletion 202


// Respond to meetup RSVP
rsvp(req, res) {
	const findmeetup = confirmMeetup(req.params.meetupId);
	if (findmeetup) {
		res.status(200).json({
    status: 200,
    message: `thanks for responding to the meetup ${req.params.meetupId}`,
  });
} else {
	res.status(404).json({
		message: 'the meetup your trying to respond to does not exist'
	});
}
}//end of rsvp for a meetup

// Get a specific meetup record.
getsingleMeetup(req, res) {
  const findmeetup = confirmMeetup(req.params.meetupId);
  if (findmeetup) {
    res.status(200).json({ status: 200, data: findmeetup });
  } else {
    res.status(404).json({
      status: 404,
      data: `no such meetup found with ID ${req.params.meetupId}`,
    });
  }
}// end of Get a specific meetup record.


}
const meetupControllers = new meetupController();
module.exports = meetupControllers;
