const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const helper = require('../utils/blog_api_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

describe('when there is initially some notes saved', () => {
  test('Success with default value of like is 0', async () => {
    const newBlog = {
      title: 'Science',
      author: 'Orzech',
      url: 'endOFTheWorld',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await Blog.find({});
    expect(parseInt(newBlogs[2].likes)).toBe(0);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('that resposne is with correct length', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
  });
});

describe('viewing a specifin note', () => {
  test('verify name of indetifire to be id', async () => {
    const blogs = await Blog.find({});
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('addidion of a new note', () => {
  test('fails with status code 400 if the Title and url is missing', async () => {
    const newBlog = {
      author: 'Orzech',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
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
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await Blog.find({});
    expect(newBlogs).toHaveLength(3);
    expect(newBlogs[2].title).toEqual(newBlog.title);
  });
});

describe('deleting', () => {
  test('sucess with status code 204 if id is valid', async () => {
    const newBlogs = await Blog.find({});
    await api.delete(`/api/blogs/${newBlogs[0].id}`).expect(204);
  });
});
describe('updating data', () => {
  test('succes if returns updated data', async () => {
    const newBlogs = await Blog.find({});
    console.log(newBlogs[0].id);

    await api.put(`/api/blogs/${newBlogs[0].id}`).send({ likes: '20' });

    const updatedBlogs = await Blog.findById(newBlogs[0].id);
    console.log(updatedBlogs);
    expect(parseInt(updatedBlogs.likes)).toBe(20);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
