const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(blogs[0]);
  await noteObject.save();
  noteObject = new Blog(blogs[1]);
  await noteObject.save();
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

test('verify name of indetifire to be id', async () => {
  const blogs = await Blog.find({});
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('Post blog can be added', async () => {
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

test('If likes property is missing', async () => {
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

test('If the url and title is misisng', async () => {
  const newBlog = {
    author: 'Orzech',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
