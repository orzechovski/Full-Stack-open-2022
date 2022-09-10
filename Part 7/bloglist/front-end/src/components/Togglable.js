import { useState } from 'react'
import { useSelector } from 'react-redux'

const Togglable = ({ buttonLabel, children }) => {
  const user = useSelector((state) => state.users)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    user !== null && (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} id="button_createBlog">
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  )
}

export default Togglable
