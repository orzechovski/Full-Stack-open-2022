import './styles/App.css';
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NewBlog from './components/BlogForm';
import blogService from './services/blogs';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: '', content: '' });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      <h2>blogs</h2>
      <LoginForm setUser={setUser} user={user} setNotification={setNotification} />

      <Notification info={notification} />

      {user !== null && (
        <Togglable buttonLabel="create new blog">
          <NewBlog blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
        </Togglable>
      )}

      <div className="blog_wraper">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} setBlogs={setBlogs} setNotification={setNotification} blogs={blogs} blog={blog} />
          ))}
      </div>
    </>
  );
};

export default App;
