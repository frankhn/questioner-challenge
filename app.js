import express from 'express';
import http from 'http';
const app = express();
import morgan from 'morgan';// simplifying logging

const port = process.env.PORT || 3000;

import bodyParser from 'body-parser'; // for extracting body portion
import meetup from './server/routes/routes';

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // for only passing strings and arrays
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  return next();
});

app.use('/api/v1', meetup);
app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
  res.status(200).sendFile('./UI/html/index.html', { root: __dirname });// for use on heroku as a homepage
});

app.use((req, res, next) => {
  const error = new Error('OOPs!!! Not Found');
  error.status = 404;
  next(error);
});

app.listen(port, () =>{
  console.log('server started');
})


module.exports = app;