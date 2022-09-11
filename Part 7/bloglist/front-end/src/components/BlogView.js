import CommentForm from './CommentForm'
import { useMatch, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updatesBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
const BlogView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const match = useMatch('blogs/:id')
  const blog = useSelector((state) => state.blogs.filter((e) => e.id === match.params.id)[0])

  if (!blog)
    return (
      <button className="btn" onClick={() => navigate('/')}>
        back
      </button>
    )

  const { likes, url, author, title, id, comments } = blog

  const updateBlog = async () => {
    try {
      const newLike = { likes: parseInt(likes) + 1 }
      await dispatch(updatesBlog(id, newLike))
      notification('like', `like given to ${title}`)
    } catch (err) {
      notification('error', 'something went wrong')
      console.log(err)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${author}?`)) {
      try {
        await dispatch(removeBlog(id))
        notification('blogdeleted', `Blog named "${title}" has been deleted`)
        navigate('/')
      } catch (err) {
        console.log(err)
        notification('error', 'You are not owner of that blog')
      }
    }
  }

  const notification = (type, content) => {
    dispatch(setNotification({ type, content }, 3))
  }
  return (
    <div className="w-full p-10">
      <div>
        <h2 className="font-semibold inline-block p-2 px-4 text-3xl rounded-sm">{title}</h2>
        <div className="my-2">Link: {url}</div>
        <div className="my-2">
          Added by <span style={{ color: 'lightblue' }}>{author}</span>{' '}
        </div>
        <div className="my-2">
          {likes} likes
          <button onClick={updateBlog} className="btn bg-sky-700 hover:bg-sky-400">
            like
          </button>
          <button className="btn bg-red-800 hover:bg-red-600" onClick={deleteBlog}>
            delete
          </button>
          <div>
            <h2 className="font-semibold mt-10 mb-2 inline-block p-2 px-4 text-3xl rounded-sm">comments</h2>
            {comments.length > 0 &&
              comments.map((comment) => (
                <li className="my-2" key={comment.id}>
                  {comment}
                </li>
              ))}
            <CommentForm id={id} comments={comments} />
          </div>
        </div>
      </div>
      <button className="btn p-1 px-2 m-0" onClick={() => navigate('/')}>
        back
      </button>
    </div>
  )
}

export default BlogView
