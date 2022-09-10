import { useState, useEffect } from 'react'
import { login } from '../services/login'
import { setToken, getToken } from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { userSet } from '../reducers/userReducer'

const LoginForm = () => {
  const user = useSelector((state) => state.users.logedUser)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitingSupport = (type, content) => {
    dispatch(setNotification({ type, content }, 3))
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    const loggerUSerJSON = getToken()
    if (loggerUSerJSON) {
      const user = JSON.parse(loggerUSerJSON)
      dispatch(userSet(user))
      setToken(user.token)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setToken(user.token)
      dispatch(userSet(user))
      submitingSupport('login', 'Sucesfull Login')
    } catch (err) {
      submitingSupport('error', 'Wrong username or password')
      console.log(err)
    }
  }

  return user === null ? (
    <form onSubmit={handleSubmit} className="form__login">
      <div>
        username <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="text" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  ) : (
    <div className="form__login" style={{ color: 'lightgreen' }}>
      {user.username} logged in
      <button
        className="button__logout"
        onClick={() => {
          window.localStorage.removeItem('loggedUser')
          submitingSupport('login', `${user.username} logout`)
          dispatch(userSet(null))
        }}
      >
        logout
      </button>
    </div>
  )
}

export default LoginForm
