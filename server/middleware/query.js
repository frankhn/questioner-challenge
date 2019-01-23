
const MeetupQuery = {};

const getAllmeetups = 'SELECT *FROM meetup_table';

const getsingleMeetup = 'SELECT *FROM meetup_table WHERE id = $1';

const deleteMeetup = 'SELECT *FROM meetup_table WHERE id = $1';

const createMeetup = 'INSERT INTO meetup_table(create_on,location,topic,happening_on,image_name)VALUES($1,$1,$1,$1) RETURNING *';

const updateMeetup = 'UPDATE meetup_table SET [$1] = WHERE id = $1';

MeetupQuery.getAllmeetups = getAllmeetups;
MeetupQuery.getsingleMeetup = getsingleMeetup;
MeetupQuery.deleteMeetup = deleteMeetup;
MeetupQuery.updateMeetup = updateMeetup;
MeetupQuery.createMeetup = createMeetup;

const QuestionQuery = {};

const getAllQuestions = 'SELECT *FROM question_table';

const getSingleQuestion = 'SELECT *FROM question_table WHERE id = $1';

const deleteQuestion = 'SELECT *FROM question_table WHERE id = $1';

const createQuestion = 'INSERT INTO question_table VALUES($1,$1,$1,$1)';

const updateQuestion = 'UPDATE question_table SET body = $1 topic=$1 WHERE id = $1';

QuestionQuery.getAllQuestions = getAllQuestions;
QuestionQuery.getSingleQuestion = getSingleQuestion;
QuestionQuery.deleteQuestion = deleteQuestion;
QuestionQuery.updateQuestion = updateQuestion;
QuestionQuery.createQuestion = createQuestion;


module.exports = {
    MeetupQuery,
    QuestionQuery
}


// query.getAllmeetups = getAllmeetups;


// async getmeetup (req, res) =>{
//     const id;
//     const query = executeQuerry(query.getAllmeetups, [id]); 
// }

