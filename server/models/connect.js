import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

class InitializeDb {
  constructor() {
    this.pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    this.connect = async () => this.pool.connect();

    /**
     * scripts for creating tables
     */
    this.userTable = `
    CREATE TABLE IF NOT EXISTS user_table (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    othername VARCHAR(30),
    email VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    phone_number VARCHAR(12) NOT NULL,
    registered TIMESTAMP DEFAULT current_timestamp,
    is_admin BOOLEAN  DEFAULT false,
    password VARCHAR(120) NOT NULL
        );
        `;
    this.meetupTable = `
    CREATE TABLE IF NOT EXISTS meetup_table (
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP DEFAULT current_timestamp,
        location VARCHAR(30) NOT NULL,
        topic varchar(30) NOT NULL,
        happening_on VARCHAR(50) NOT NULL,
        image_name VARCHAR(255) NOT NULL
    );
    `;
    this.questionTable = `
    CREATE TABLE IF NOT EXISTS question_table (
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP DEFAULT current_timestamp,
        created_by SERIAL REFERENCES user_table(id) ON DELETE CASCADE,
        meetup_id SERIAL REFERENCES meetup_table(id) ON DELETE CASCADE,
        title VARCHAR(30) NOT NULL,
        body VARCHAR(30) NOT NULL,
        upvote INTEGER DEFAULT 0,
        downvote INTEGER DEFAULT 0
    );
    `;/**
     * questions are related to meetups
     */
    this.commentTable = `
    CREATE TABLE IF NOT EXISTS comment_table (
        id SERIAL PRIMARY KEY,
        user_id SERIAL REFERENCES user_table(id) ON DELETE CASCADE,
        question_id SERIAL REFERENCES question_table(id) ON DELETE CASCADE,
        body VARCHAR(30) NOT NULL
    );
    `;
    /**
     * comments are related to questions
     */
    this.voteTable = `
    CREATE TABLE IF NOT EXISTS vote_table (
      id SERIAL PRIMARY KEY,
      created_on TIMESTAMP DEFAULT current_timestamp,
      user_id SERIAL REFERENCES user_table(id) ON DELETE CASCADE,
      quesion_id SERIAL REFERENCES question_table(id) ON DELETE CASCADE,
      status BOOLEAN NOT NULL 
    )`;
    /**
     * status can be either 1(upvote) or 0(downvote)
     */

    this.rsvpTable = `
    CREATE TABLE IF NOT EXISTS rsvp_table (
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP DEFAULT current_timestamp,
        user_id SERIAL REFERENCES user_table(id) ON DELETE CASCADE,
        meetup_id SERIAL REFERENCES meetup_table(id) ON DELETE CASCADE
    );
    `;
    /**
     * respond to a meetup with user id and meetup id
     */

    this.meetupTagTable = `
    CREATE TABLE IF NOT EXISTS tag_table (
        id SERIAL PRIMARY KEY,
        meetup_id SERIAL REFERENCES meetup_table(id) ON DELETE CASCADE,
        body VARCHAR(10) NOT NULL
    );
    `;
    /**
     * tags are related to a meetup
     */

    this.meetupImagesTable = `
    CREATE TABLE IF NOT EXISTS meetup_images_table (
        id SERIAL PRIMARY KEY,
        meetup SERIAL REFERENCES meetup_table(id) ON DELETE CASCADE,
        image_name VARCHAR(255) NOT NULL
    );
    `;
    /**
     * images that are related to meetups 
     */
    this.startDb();
  }
/**
 * execute the queries to create tables if not exist
 */
  async startDb() {
    await this.executeQuery(this.userTable);//
    await this.executeQuery(this.meetupTable);//
    await this.executeQuery(this.meetupTagTable);//
    await this.executeQuery(this.questionTable);//
    await this.executeQuery(this.meetupImagesTable);//
    await this.executeQuery(this.rsvpTable);//
    await this.executeQuery(this.voteTable);//
    await this.executeQuery(this.commentTable);//
  }
  /**
   * 
   * @param {*each request} query 
   * @param {*return response for the queries passed} data 
   */
  async executeQuery(sql) {
    const connection = await this.connect();
    try
     {
       await connection.query(sql);
    } catch (error) 
    {
      return error;
    } finally
    {
      /**
       * release the connection
       */
      connection.release();
    }
  }
}
export default new InitializeDb();