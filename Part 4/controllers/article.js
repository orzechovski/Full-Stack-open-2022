const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', (req, res) => Blog.find({}).then((blog) => res.json(blog)));

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => res.status(201).json(result));
});

module.exports = blogsRouter;
