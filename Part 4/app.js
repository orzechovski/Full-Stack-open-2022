const { MONGO_URL } = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const blogsRouter = require('./controllers/article');
const app = express();

//mognoose
mongoose.connect(MONGO_URL);

//midleware
app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
