import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Navigation from './components/Navigation'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <div className="w-screen h-[80vh] flex ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="create new blog">
                  <BlogForm />
                </Togglable>
                <BlogList />
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </div>
    </>
  )
}

export default App
