require('express-async-errors');
const { MONGO_URL } = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogsRouter = require('./controllers/article');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { errorHandler, unknownEndpoint, tokenExtractor, userExtractor } = require('./utils/middleware');
const app = express();

//mognoose
mongoose.connect(MONGO_URL);

//midleware
app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
