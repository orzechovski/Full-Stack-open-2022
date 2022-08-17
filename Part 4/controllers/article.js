const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  if ((title || url) === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const blog = new Blog(req.body);
  const blogSave = await blog.save();
  res.status(201).json(blogSave);
});

module.exports = blogsRouter;
