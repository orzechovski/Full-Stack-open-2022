import serviceBlog from '../services/blogs';
import { useState } from 'react';

const Blog = ({ blog, setBlogs, blogs, setNotification }) => {
  const [visibility, setVisibility] = useState(false);
  const { title, author, url, id, likes } = blog;

  const submitingSupport = (type, content) => {
    setNotification({ type, content });
    setTimeout(() => setNotification({ type: '', content: '' }), 3000);
  };

  const updateBlog = async () => {
    try {
      const newBlog = { ...blog, likes: parseInt(likes) + 1 };
      const updatedBlog = await serviceBlog.update(id, { likes: parseInt(likes) + 1 });
      const newBlogs = blogs.map((blog) => (blog.id === updatedBlog.id ? newBlog : blog));
      setBlogs(newBlogs);
      submitingSupport('like', `like given to ${newBlog.title}`);
    } catch (err) {
      submitingSupport('error', 'something went wrong');
      console.log(err);
    }
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${author}?`)) {
      try {
        await serviceBlog.del(id);
        const updatesBlogs = blogs.filter((e) => e.id !== id);
        setBlogs(updatesBlogs);
        submitingSupport('blogdeleted', `Blog named "${title}" has been deleted`);
      } catch (err) {
        console.log(err);
        submitingSupport('error', 'You are not owner of that blog');
      }
    }
  };
  return (
    <div className="blog">
      {visibility ? (
        <>
          <div className="blog_fullsized">
            <div>Title: {title}</div>
            <div>link: {url}</div>
            <div className="blog__likes">
              likes : {likes}
              <button className="like" onClick={updateBlog}>
                like
              </button>
            </div>
            <div>
              <span style={{ color: 'lightblue' }}> {blog.author}</span>
            </div>
          </div>
          <button className="button--delete" onClick={deleteBlog}>
            delete
          </button>
        </>
      ) : (
        <span className="blog_minisized">
          {title} <span style={{ color: 'lightblue' }}> {author}</span>
        </span>
      )}

      <button className="view" onClick={() => setVisibility(!visibility)}>
        {visibility ? 'hide' : 'view'}
      </button>
    </div>
  );
};
export default Blog;
