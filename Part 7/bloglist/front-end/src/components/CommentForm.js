import useField from '../hooks'
import { useDispatch } from 'react-redux'
import { updatesBlog } from '../reducers/blogReducer'
const CommentForm = ({ id, comments }) => {
  const dispatch = useDispatch()
  const { reset: resetField, ...field } = useField('text')

  const addComment = async (e) => {
    e.preventDefault()

    const newComment = { comments: [...comments, field.value] }
    await dispatch(updatesBlog(id, newComment))
    resetField()
  }
  return (
    <div className="my-4">
      <form onSubmit={addComment}>
        <input {...field} className="p-1 rounded-sm" />
        <button type="submit" className="btn bg-sky-700 hover:bg-sky-400">
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
