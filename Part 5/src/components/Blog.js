const Blog = ({ blog }) => (
  <div className="blog">
    {blog.title} <span style={{ color: 'lightblue' }}>{blog.author}</span>
  </div>
);

export default Blog;
