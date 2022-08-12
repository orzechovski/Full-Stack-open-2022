const lodash = require('lodash');
const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0].likes;
  const arr = blogs.reduce((sum, item) => sum + item.likes, 0);
  return arr;
};

const favoriteBlog = (blogs) => {
  let temp = 0;
  blogs.forEach((blog) => (blog.likes > temp ? (temp = blog.likes) : null));

  return blogs.filter((blog) => blog.likes === temp);
};

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author');
  const bestOne = lodash.keys(authors).reduce((cur, prev) => (authors[cur] > authors[prev] ? cur : prev));
  return { author: bestOne, blogs: authors[bestOne] };
};

const mostLikes = (blogs) => {
  const countedLikes = lodash(blogs)
    .groupBy('author')
    .map((element, index) => ({ author: index, likes: lodash.sumBy(element, 'likes') }))
    .value();

  let temp = 0;
  countedLikes.forEach((blog) => (blog.likes > temp ? (temp = blog.likes) : null));
  return countedLikes.filter((blog) => blog.likes === temp)[0];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
