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
    <>
      <h2>Create new 📋</h2>
      <form onSubmit={handleCreateBlog} className="blog__form">
        <label>
          title: <input type="text" name="title" value={title} onChange={({ target }) => setBlog({ ...blog, title: target.value })} />
        </label>{' '}
        <label>
          author: <input type="text" name="author" value={author} onChange={({ target }) => setBlog({ ...blog, author: target.value })} />
        </label>{' '}
        <label>
          url: <input type="text" name="url" value={url} onChange={({ target }) => setBlog({ ...blog, url: target.value })} />
        </label>
        <button type="submit">Add new Blog</button>
      </form>
    </>
  )
}

export default NewBlog
