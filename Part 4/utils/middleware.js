const User = require('../models/User');
const jwt = require('jsonwebtoken');

const errorHandler = (error, req, res, next) => {
  const { name } = error;

  if (name === 'CastError') return res.status(400).send({ error: 'malformatted id' });
  if (name === 'ValidationError') return res.status(400).send({ error: error.message });
  if (name === 'JsonWebTokenError') return res.status(401).send({ error: 'invalid token' });
  if (name === 'TokenExpiredError') return res.status(401).send({ error: 'token expired' });
  next(error);
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
  }
  next();
};

module.exports = { errorHandler, unknownEndpoint, tokenExtractor, userExtractor };
