import { useEffect } from 'react'
import { login } from '../services/login'
import { setToken, getToken } from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { userSet } from '../reducers/userReducer'
import useField from '../hooks'

const LoginForm = () => {
  const user = useSelector((state) => state.users.logedUser)
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('text')

  const submitingSupport = (type, content) => {
    dispatch(setNotification({ type, content }, 3))
    resetUsername()
    resetPassword()
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
      const user = await login({ username: username.value, password: password.value })
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
    <form onSubmit={handleSubmit} className="ml-auto mx-6 flex items-center">
      <div className="mx-2">
        <input {...username} placeholder="username" className="text-black p-1 rounded-sm" />
      </div>
      <div className="mx-2">
        <input {...password} placeholder="password" className="text-black p-1 rounded-sm" />
      </div>
      <button
        className="px-6 py-1 mx-6 text-white text-lg rounded-md bg-emerald-900 hover:bg-emerald-400
       transition duration-200"
        type="submit"
      >
        login
      </button>
    </form>
  ) : (
    <div className="ml-auto px-6">
      <span className="text-emerald-400">{user.username}</span> logged in
      <button
        className=" px-6  py-1 mx-6 text-white text-lg rounded-md bg-emerald-900 hover:bg-emerald-400 transition duration-200"
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
