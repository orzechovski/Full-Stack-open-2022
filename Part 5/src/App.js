import './styles/App.css';
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState({ author: '', title: '', url: '' });
  const [notification, setNotification] = useState({ type: '', content: '' });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggerUSerJSON = window.localStorage.getItem('loggedUser');
    if (loggerUSerJSON) {
      const user = JSON.parse(loggerUSerJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const newNotification = (type, content) => {
    setNotification({ type, content });
    setTimeout(() => setNotification({ type: '', content: '' }), 3000);
  };

  const handleNewBlogSubmit = (e) => {
    e.preventDefault();
    blogService.create(blog);
    newNotification('blogAdded', `${blog.title} by ${blog.author}`);
    setBlog({ author: '', title: '', url: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      newNotification('login', 'Sucesfull Login');
    } catch (err) {
      newNotification('error', 'Wrong username or password');
      setUsername('');
      setPassword('');
      console.log(err);
    }
  };

  return (
    <>
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm submit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      ) : (
        <div style={{ margin: '0.5em', color: 'lightgreen' }}>
          {user.username} logged in
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedUser');
              newNotification('login', `${user.username} logged out!`);
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
      )}
      <Notification info={notification} />
      {user !== null && (
        <div>
          <h2>Create new</h2>
          <NewBlog setBlog={setBlog} blog={blog} submit={handleNewBlogSubmit} />
        </div>
      )}

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
