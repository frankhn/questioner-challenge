const meetups = require('../models/meetup');

class meetupController {
  // get all meetups
  allMeetup(req, res) {
  res.status(200).json({
    status: 200,
    data: meetups,
  });
}// end of get all meetups


}
const meetupControllers = new meetupController();
module.exports = meetupControllers;
