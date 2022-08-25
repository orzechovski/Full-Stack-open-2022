const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blogs = await Blog.findById(req.params.id);
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes, id } = req.body;
  const user = req.user;
  const token = req.token;

  //token validation
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  if ((title || url) === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    id,
    user: user._id,
  });
  const blogSave = await blog.save();
  user.blogs = user.blogs.concat(blogSave._id);
  await user.save();
  res.status(201).json(blogSave);
});

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user.toJSON();
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(400).json({ error: 'wrong url id' });
  }

  if (blog.toJSON().user.toJSON() === user.id) {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(204).json(deletedBlog);
  } else {
    res.status(400).json({ error: 'invalid token for that operation' });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
