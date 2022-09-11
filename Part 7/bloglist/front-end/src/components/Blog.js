import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const { title, author } = blog

  return (
    <div className="border p-2 rounded-md border-emerald-800 my-2 text-lg">
      <span className="">
        <Link className="text-teal-500" to={`/blogs/${blog.id}`}>
          {title}
        </Link>
        <span className="text-cyan-500"> {author}</span>
      </span>
    </div>
  )
}
export default Blog
