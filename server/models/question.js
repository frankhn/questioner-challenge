
//array to hold questions
const questions = [
	{
		id: 1, 
		createdOn: '12/12/2018', 
		createdBy: 2, 
		meetup: "2", 
		title: 'bootcamp', 
		bodyy: 'when is the bootcamp schedured',
		upvote: 0,
		downvote: 0
	},
	{
		id: 2, 
		createdOn: '12/12/2018', 
		createdBy: 1, 
		meetup:"2", 
		title: 'frank joe', 
		bodyy: 'who will be our chairman',
		upvote: 0,
		downvote: 0,
		state:[
			{
				id: 1,
				user: 2,
				action: 1,
				
			}
		]
	},
];

module.exports = questions