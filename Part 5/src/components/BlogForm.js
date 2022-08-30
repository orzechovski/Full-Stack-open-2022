import blogService from '../services/blogs';
import { useState } from 'react';

const NewBlog = ({ setNotification, setBlogs, blogs }) => {
  const [blog, setBlog] = useState({ author: '', title: '', url: '' });
  const { title, author, url } = blog;

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const createdBlog = await blogService.create(blog);
    blogs === undefined ? setBlogs(createdBlog) : setBlogs(blogs.concat(createdBlog));
    setBlog({ author: '', title: '', url: '' });

    //notification
    setNotification({ type: 'blogAdded', content: `${title} by ${author}` });
    setTimeout(() => setNotification({ type: '', content: '' }), 3000);
  };

  return (
    <>
      <h2>Create new 📋</h2>
      <form onSubmit={handleCreateBlog} className="blog__form">
        <label>
          title: <input type="text" name="title" value={title} onChange={({ target }) => setBlog({ ...blog, title: target.value })} />
        </label>{' '}
        <label>
          author: <input type="text" name="author" value={author} onChange={({ target }) => setBlog({ ...blog, author: target.value })} />
        </label>{' '}
        <label>
          url: <input type="text" name="url" value={url} onChange={({ target }) => setBlog({ ...blog, url: target.value })} />
        </label>
        <button type="submit">Add new Blog</button>
      </form>
    </>
  );
};

export default NewBlog;
