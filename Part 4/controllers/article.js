const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

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

  const user = await User.findById(req.body.userId);

  if ((title || url) === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  try {
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
blogsRouter.put('/:id', async (req, res) => {
  console.log(req.body);
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updatedBlog);
  } catch (err) {
    console.log(err);
  }
});
module.exports = blogsRouter;
