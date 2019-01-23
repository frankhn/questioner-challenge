process.env.NODE_ENV = 'test';
import meetups  from '../models/meetup';

import  questions from '../models/question';

//Require the dev-dependencies
import chai from 'chai';
import server from '../../app';
let should = chai.should();
import chaiHttp from 'chai-http';



chai.use(chaiHttp);

/**
 * test Get all the meetups
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

  /**
   * test get specific meetup
   */
  describe('/ GET a specific meetup record', () => {
      it('it should return a meetup', (done) => {
        chai.request(server)
            .get('/api/v1/meetups/6')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  /**
   * responde rsvp to a meetup
   */
 describe('/POST RSVP for a meetup', () => {
      it('it should be to reach RSVP', (done) => {
      	let meetupId = 6;
        chai.request(server)
            .post(`/api/v1/meetups/${meetupId}/rsvp`)
            .end((err, res) => {
                  res.should.have.status(201);
             done();
            });
      });

  });

/**
 * test create a meetup
 */

  describe('/POST create a meetup', () => {
      it('it should be able to create a meet up', (done) => {
          let mtp = {
            location:"kacyiru",
            image_name:"imagename",
            topic:"topic",
            happening_on:"2019-11-21"
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

  /**
   * Get questions
   */

  describe('/ GET questions ', () => {
      it('it should GET all the questions', (done) => {
        let meetupId = 6;
        chai.request(server)
            .get(`/api/v1/meetups/${meetupId}/questions`)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  /**
   * create a question
   */

  describe('/POST create a question', () => {
      it('it should be able to create a question', (done) => {
          let qst = {
            title:"sp",
            body:"akhdjfaljdlf lasdlakj"
          };
        let meetupId = 12;
        chai.request(server)
            .post(`/api/v1/meetups/${meetupId}/questions`)
            .send(qst)
            .end((err, res) => {
                  res.should.have.status(201);
              done();
            });
      });

  });

  /**
   * upvote testing
   */

   describe('/patch/:id question (upvote)', () => {
      it('it should UPDATE (upvote) a question given the id', (done) => {
      	let qId= 25;
          chai.request(server) 
                .patch(`/api/v1/questions/${qId}/upvote`)
                .end((err, res) => {
                      res.should.have.status(201);
                   done();
                });
          });
      });

  /** 
   * downvote testing
   * */ 

   describe('/patch/:id question (downvote)', () => {
      it('it should UPDATE(downvote) a question given the id', (done) => {
        let qId= 25;
          chai.request(server)
                .patch(`/api/v1/questions/${qId}/downvote`)
                .end((err, res) => {
                      res.should.have.status(201);
                  done();
                });
          });
      });

  /**
   * 
   * delete a meetup
   */

   describe('/Delete a meetup', () => {
      it('it should be able to delete a meetup', (done) => {
        let meetupId= 28;
          chai.request(server)
                .delete(`/api/v1/meetups/${meetupId}`)
                .end((err, res) => {
                      res.should.have.status(202);
                  done();
                });
          });
      });

/**
 * comment testing
 */
  
  describe('/POST comment on a specific question', () => {
      it('it should be able to comment the question', (done) => {
          let qst = { 
             body: "this is a beet crazy"
          };
          let questionId = 10;
        chai.request(server)
            .post(`/api/v1/questions/${questionId}/comments`)
            .send(qst)
            .end((err, res) => {
                  res.should.have.status(201);
              done();
            });
      });

  });

/**
 * testing the 404 bad request
 */

describe('/request a a lock request', () => {
    it('it should a not found response', (done) => {
        chai.request(server)
              .lock(`/`)
              .end((err, res) => {
                    res.should.have.status(404);
                done();
              });
        });
    });

/**
 * 
 *home page testing 
 */

    describe('/ the home page request', () => {
        it('it should be able to reach the home page index.html', (done) => {
            chai.request(server)
                  .get(`/`)
                  .end((err, res) => {
                        res.should.have.status(200);
                    done();
                  });
            });
        });

        