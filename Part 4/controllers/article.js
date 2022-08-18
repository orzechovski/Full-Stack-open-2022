const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blogs = await Blog.findById(req.params.id);
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
  if ((title || url) === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }
  try {
    const blog = new Blog(req.body);
    const blogSave = await blog.save();
    res.status(201).json(blogSave);
  } catch (err) {
    res.send(err);
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json(deletedBlog);
  } catch (err) {
    console.log(err);
  }
});

module.exports = blogsRouter;
