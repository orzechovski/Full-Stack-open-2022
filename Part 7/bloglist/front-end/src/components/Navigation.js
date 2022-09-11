import { NavLink } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Navigation = () => {
  return (
    <nav className="flex items-center bg-slate-900 mb-5 w-screen h-20 m-0">
      <h2 className="text-3xl  pr-20 px-6 font-bold tracking-wide">blog list app</h2>
      <NavLink className={'mx-2 px-2'} to="/">
        Blogs
      </NavLink>
      <NavLink className={'mx-2 px-2'} to="/users">
        Users
      </NavLink>
      <LoginForm />
    </nav>
  )
}

export default Navigation
