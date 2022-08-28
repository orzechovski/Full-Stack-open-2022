import blogService from '../services/blogs';
import { useState } from 'react';

const NewBlog = ({ setNotification, setBlogs, blogs }) => {
  const [blog, setBlog] = useState({ author: '', title: '', url: '' });
  const { title, author, url } = blog;

  const handleSubmit = (e) => {
    e.preventDefault();
    blogService.create(blog);

    setBlogs(blogs.concat(blog));
    setBlog({ author: '', title: '', url: '' });

    //notification
    setNotification({ type: 'blogAdded', content: `${blog.title} by ${blog.author}` });
    setTimeout(() => setNotification({ type: '', content: '' }), 3000);
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title: <input type="text" name="title" value={title} onChange={({ target }) => setBlog({ ...blog, title: target.value })} />
        </label>{' '}
        <label>
          author: <input type="text" name="auhtor" value={author} onChange={({ target }) => setBlog({ ...blog, author: target.value })} />
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
