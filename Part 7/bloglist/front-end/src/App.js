import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Navigation from './components/Navigation'
import Users from './components/Users'

const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <div className="wraper">
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
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </>
  )
}

export default App
