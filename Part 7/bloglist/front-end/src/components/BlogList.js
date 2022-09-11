import { initialBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogList = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  return (
    <div className="flex-col w-1/2 p-4">
      {[...blogList]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
