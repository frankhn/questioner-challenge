const meetups = require('../models/meetup');


const confirmMeetup = (meetupId) =>{ 
	const confirm = meetups.find(c => c.id === parseInt(meetupId, 10));
	if (confirm) return confirm;
};
module.exports = confirmMeetup;