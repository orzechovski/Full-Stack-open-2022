const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { initialBlogs, blogsInDb } = require('../utils/test_helper');

const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('when there is initially some notes saved', () => {
  let token = null;
  beforeAll(async () => {
    User.deleteMany({});
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('marian1234', saltRounds);
    const user = await new User({ username: 'Marianno', name: 'marian', password: passwordHash }).save();
    token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET);
    return token;
  });

  test('Success with default value of like is 0', async () => {
    const newBlog = {
      title: 'Science',
      author: 'Orzech',
      url: 'endOFTheWorld',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await blogsInDb();
    expect(parseInt(newBlogs[6].likes)).toBe(0);
  });

  test('fails with status code 400 if the Title and url is missing', async () => {
    const newBlog = {
      author: 'Orzech',
    };

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400);
  });

  test('that resposne is with correct length', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(6);
  });

  test('Succes with valid data', async () => {
    const newBlog = {
      title: 'Science',
      author: 'Orzech',
      url: 'endOFTheWorld',
      likes: 15,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await blogsInDb();
    expect(newBlogs).toHaveLength(7);
    expect(newBlogs[6].title).toEqual(newBlog.title);
  });
});

describe('viewing a specifin note', () => {
  test('verify name of indetifire to be id', async () => {
    const blogs = await blogsInDb();
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deleting', () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('marian1234', saltRounds);
    const user = await new User({ username: 'Marianno', name: 'marian', password: passwordHash }).save();

    token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET);

    const newBlog = {
      title: 'mariannoblog',
      author: 'marianno',
      url: 'tothemoon',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    return token;
  });

  test('sucess with status code 204 if id is valid', async () => {
    const newBlogs = await Blog.find({});
    await api.delete(`/api/blogs/${newBlogs[0].id}`).set('Authorization', `Bearer ${token}`).expect(204);
  });

  test('fail with status code 401 if there is no authorization', async () => {
    const newBlogs = await Blog.find({});
    await api.delete(`/api/blogs/${newBlogs[0].id}`).set('Authorization', `Bearer ${token} string for break token`).expect(401);
  });
});

//updating
describe('updating data', () => {
  test('succes if returns updated data', async () => {
    const newBlogs = await blogsInDb();

    await api.put(`/api/blogs/${newBlogs[0].id}`).send({ likes: '20' });

    const updatedBlogs = await Blog.findById(newBlogs[0].id);
    expect(parseInt(updatedBlogs.likes)).toBe(20);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
