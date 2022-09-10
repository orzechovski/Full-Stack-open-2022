import { NavLink } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Navigation = () => {
  return (
    <nav>
      <h2>blog list app</h2>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <LoginForm />
    </nav>
  )
}

export default Navigation
