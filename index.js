const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const middlewares = require('./auth/middleware')

const app = express();


const auth = require('./auth/index');
const feed = require('./feed/feed');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('mongodb is connected');
}).catch((error) => {
  console.log('mongodb not connected');
  console.log(error);
});

mongoose.set('useFindAndModify', false);

app.use(morgan('dev'));
app.use(express.json()); 
app.use(middlewares.checkTokenSetUser);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/', (req,res) => {
  res.json({
    message: "Hello world",
    user: req.user
  });
});

app.use('/auth', auth);
app.use('/feed', feed); // here /auth is pre-pended to the links to be send in this.

// * Error Handler
function notFound(req, res, next) {
  res.status(404);
  const error = new Error ('Not Found - ' + req.originalUrl);
}

function errorHandle(err,req,res,next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandle);

port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Web Server is listening at port ', port);
});