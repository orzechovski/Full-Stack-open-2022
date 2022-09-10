import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visibility, setVisibility] = useState(false)
  const { title, author, url, id, likes } = blog

  const notification = (type, content) => {
    dispatch(setNotification({ type, content }, 3))
  }

  const updateBlog = async () => {
    try {
      const newBlog = { ...blog, likes: parseInt(likes) + 1 }
      dispatch(likeBlog(id, newBlog))
      notification('like', `like given to ${newBlog.title}`)
    } catch (err) {
      notification('error', 'something went wrong')
      console.log(err)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${author}?`)) {
      try {
        dispatch(removeBlog(id))
        notification('blogdeleted', `Blog named "${title}" has been deleted`)
      } catch (err) {
        console.log(err)
        notification('error', 'You are not owner of that blog')
      }
    }
  }
  return (
    <div className="blog">
      {visibility ? (
        <>
          <div className="blog_fullsized">
            <div>Title: {title}</div>
            <div>link: {url}</div>
            <div className="blog__likes">
              likes : {likes}
              <button className="like" onClick={updateBlog}>
                like
              </button>
            </div>
            <div>
              <span style={{ color: 'lightblue' }}> {blog.author}</span>
            </div>
          </div>
          <button className="button--delete" onClick={deleteBlog}>
            delete
          </button>
        </>
      ) : (
        <span className="blog_minisized">
          {title} <span style={{ color: 'lightblue' }}> {author}</span>
        </span>
      )}

      <button className="view" onClick={() => setVisibility(!visibility)}>
        {visibility ? 'hide' : 'view'}
      </button>
    </div>
  )
}
export default Blog
