
class Meetup{
	constructor(location,topic,happening_on,image_name){
		this.happening_on = happening_on;
		this.location = location;
		this.topic = topic;
		this.image_name = image_name;
	}
}
module.exports = new Meetup();

// const meetups = [
// 	{
// 		id: 1, createdOn: '12/12/2018', location: 'telecom house', images: 'upload/tel.jpg', topic: 'bootcamp', happeningOn: '19/12/2018', tags: '"questioner" "node js"',
// 	},
// 	{
// 		id: 2, createdOn: '15/12/2018', location: 'telecom house', images: 'upload/tel2.jpg', topic: 'bootcamp cycle2', happeningOn: '25/12/2018', tags: '"questioner" "postgreSQL js"',
// 	},
// ];


// module.exports = meetups