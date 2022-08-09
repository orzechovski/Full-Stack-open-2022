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

const mostBlogs = () => {
  //TODO: 4.6-4.7 to finish
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
