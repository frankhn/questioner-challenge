const questions = require('../models/question');


const confirmQuestion    = (questionId) =>{ 
	const confirm = questions.find(c => c.id === parseInt(questionId, 10));
	if (confirm) return confirm;
};
module.exports = confirmQuestion;