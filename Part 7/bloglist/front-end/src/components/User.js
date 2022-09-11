import { useMatch, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const User = () => {
  const navigate = useNavigate()
  const match = useMatch('users/:id')
  const user = useSelector((state) => state.users.users.filter((e) => e.id === match.params.id)[0])

  if (!user)
    return (
      <button className="btn" onClick={() => navigate('/users')}>
        back
      </button>
    )

  return (
    <div className=" w-2/6 h-2/5 p-4">
      <h2 className="text-xl my-4 text-emerald-500">{user.username}</h2>
      <h4 style={{ fontWeight: '400', textTransform: 'uppercase' }}> added blogs 📜</h4>
      <ul>
        {user.blogs.length > 0 ? (
          user.blogs.map((blog) => (
            <li className="border-2 border-cyan-900 m-2 rounded-md" style={{ padding: '0.5rem' }} key={blog.id}>
              {blog.title}
            </li>
          ))
        ) : (
          <div>no blogs added 🥲</div>
        )}
      </ul>
      <button
        className="btn"
        onClick={() => {
          navigate('/users')
        }}
      >
        back
      </button>
    </div>
  )
}

export default User
