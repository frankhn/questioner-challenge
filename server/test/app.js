process.env.NODE_ENV = 'test';
let meetups  = require('../models/meetup');

let  questions = require('../models/question');

//Require the dev-dependencies
let chai = require('chai');
let server = require('../../app');
let should = chai.should();
let chaiHttp = require('chai-http');



chai.use(chaiHttp);
//Our parent block
/*
  * Test the /GET meetup route
  */
  describe('/ GET all meetups', () => {
      it('it should GET all the meetups', (done) => {
        chai.request(server)
            .get('/api/v1/meetups')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

//Get single meetup test
  describe('/ GET a specific meetup record', () => {
      it('it should return a meetup', (done) => {
        chai.request(server)
            .get('/api/v1/meetups/1')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
  //RSVP for a meetup
 describe('/POST RSVP for a meetup', () => {
      it('it should be to reach RSVP', (done) => {
      	let meetupId = 2;
        chai.request(server)
            .post(`/api/v1/meetups/${meetupId}/rsvp`)
            .end((err, res) => {
                  res.should.have.status(200);
             done();
            });
      });

  });



//test create a meetup
  describe('/POST create a meetup', () => {
      it('it should be able to create a meet up', (done) => {
          let mtp = {
              id: meetups.length + 1,
              images :"download.jpg",
              createdOn: "12/01/2018",
              location: "telecom house",
              topic: "sunday bible study",
              tags: "bra bra bra"
          }
        chai.request(server)
            .post('/api/v1/meetups')
            .send(mtp)
            .end((err, res) => {
                  res.should.have.status(201);
              done();
            });
      });

  });
  //Get all question for a meetup
  describe('/ GET questions for a specific meetup', () => {
      it('it should GET all the questions', (done) => {
        let meetupId = 1;
        chai.request(server)
            .get(`/api/v1/meetups/${meetupId}/questions`)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  //test for creating a question
  describe('/POST create a question', () => {
      it('it should be able to create a question', (done) => {
          let qst = {
              id: questions.length + 1,
              createdOn: "02/01/2019",
              createdBy: 1,
              meetup: 1,
              title: "what is this",
              bodyy: "it is what it is"
          };
        let meetupId = 1;
        chai.request(server)
            .post(`/api/v1/meetups/${meetupId}/questions`)
            .send(qst)
            .end((err, res) => {
                  res.should.have.status(201);
              done();
            });
      });

  });

  //upvote a question
   describe('/patch/:id question (upvote)', () => {
      it('it should UPDATE (upvote) a question given the id', (done) => {
      	let qId= 1;
          chai.request(server) 
                .patch(`/api/v1/questions/${qId}/upvote`)
                .end((err, res) => {
                      res.should.have.status(200);
                   done();
                });
          });
      });

  //downvote a question 
   describe('/patch/:id question (downvote)', () => {
      it('it should UPDATE(downvote) a question given the id', (done) => {
        let qId= 1;
          chai.request(server)
                .patch(`/api/v1/questions/${qId}/downvote`)
                .end((err, res) => {
                      res.should.have.status(200);
                  done();
                });
          });
      });

   //delete a meetup
   describe('/Delete a meetup', () => {
      it('it should be able to delete a meetup', (done) => {
        let meetupId= 1;
          chai.request(server)
                .delete(`/api/v1/meetups/${meetupId}`)
                .end((err, res) => {
                      res.should.have.status(202);
                  done();
                });
          });
      });


  //test commenting on a question
  describe('/POST comment on a specific question', () => {
      it('it should be able to comment the question', (done) => {
          let qst = { 
              id: questions.length + 1,
              createdOn: "02/01/2019",
              createdBy: 1,
              meetup: 1
          };
          let meetupId = 1;
        chai.request(server)
            .post(`/api/v1/questions/${meetupId}/comments`)
            .send(qst)
            .end((err, res) => {
                  res.should.have.status(201);
              done();
            });
      });

  });