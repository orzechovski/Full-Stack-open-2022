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
      <div className="w-1/2 border-r border-slate-900 flex justify-center  ">
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} className="btn" id="button_createBlog">
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible} className="flex-col w-2/6">
          {children}
          <button onClick={toggleVisibility} className="btn bg-red-900 hover:bg-red-700 my-4">
            cancel
          </button>
        </div>
      </div>
    )
  )
}

export default Togglable
