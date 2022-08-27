const LoginForm = ({ submit, username, password, setUsername, setPassword }) => {
  return (
    <form onSubmit={submit}>
      <div>
        username <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="text" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
