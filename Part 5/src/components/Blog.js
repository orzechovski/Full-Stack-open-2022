import serviceBlog from '../services/blogs';
import { useState } from 'react';

const Blog = ({ blog, setBlogs, blogs, setNotification }) => {
  const [visibility, setVisibility] = useState(false);
  const [info, setInfo] = useState(blog);

  const submitingSupport = (type, content) => {
    setNotification({ type, content });
    setTimeout(() => setNotification({ type: '', content: '' }), 3000);
  };

  const updateBlog = async () => {
    try {
      const newBlog = { ...info, likes: parseInt(info.likes) + 1 };
      await serviceBlog.update(info.id, newBlog);
      setInfo(newBlog);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${info.title} by ${info.author}?`)) {
      try {
        await serviceBlog.del(info.id);

        const updatesBlogs = blogs.filter((e) => e.id !== info.id);
        setBlogs(updatesBlogs);
        submitingSupport('blogdeleted', `Blog named "${blog.title}" has been deleted`);
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
          <div>
            <div>Title: {info.title}</div>
            <div>link: {info.url}</div>
            <div>
              likes : {info.likes} <button onClick={updateBlog}>like</button>
            </div>
            <div>
              <span style={{ color: 'lightblue' }}> {info.author}</span>
            </div>
          </div>
          <button className="button--delete" onClick={deleteBlog}>
            delete
          </button>
        </>
      ) : (
        <span>
          {info.title} <span style={{ color: 'lightblue' }}> {info.author}</span>
        </span>
      )}

      <button onClick={() => setVisibility(!visibility)}>{visibility ? 'hide' : 'view'}</button>
    </div>
  );
};
export default Blog;
