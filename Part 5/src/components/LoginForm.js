import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ user, setUser, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitingSupport = (type, content) => {
    setNotification({ type, content });
    setTimeout(() => setNotification({ type: '', content: '' }), 3000);
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    const loggerUSerJSON = window.localStorage.getItem('loggedUser');
    if (loggerUSerJSON) {
      const user = JSON.parse(loggerUSerJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      submitingSupport('login', 'Sucesfull Login');
    } catch (err) {
      submitingSupport('error', 'Wrong username or password');
      console.log(err);
    }
  };

  return user === null ? (
    <form onSubmit={handleSubmit}>
      <div>
        username <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="text" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  ) : (
    <div style={{ margin: '0.5em', color: 'lightgreen' }}>
      {user.username} logged in
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedUser');
          setNotification({ type: 'login', content: `${user.username} logout` });
          setTimeout(() => setNotification({ type: '', content: '' }), 3000);
          setUser(null);
        }}
      >
        logout
      </button>
    </div>
  );
};
LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default LoginForm;
