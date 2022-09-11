import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createdBlog } from '../reducers/blogReducer'

const NewBlog = () => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState({ author: '', title: '', url: '' })
  const { title, author, url } = blog

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    dispatch(createdBlog(blog))
    setBlog({ author: '', title: '', url: '' })

    //notification
    dispatch(setNotification({ type: 'blogAdded', content: `${title} by ${author}` }, 5))
  }

  return (
    <div className="flex-col">
      <h2 className="text-center p-4 text-2xl">Create new 📋</h2>

      <form onSubmit={handleCreateBlog} className="flex-col">
        <label className="flex items-center">
          title:{' '}
          <input
            className="text-black p-1 rounded-sm m-2 ml-auto"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </label>
        <label className="flex items-center">
          author:
          <input
            className="text-black p-1 rounded-sm m-2 ml-auto"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          />
        </label>
        <label className="flex items-center">
          url:
          <input
            className="text-black p-1 rounded-sm m-2 ml-auto"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </label>
        <button type="submit" className="btn">
          Add new Blog
        </button>
      </form>
    </div>
  )
}

export default NewBlog
