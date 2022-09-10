import { useEffect } from 'react'
import { initialUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  useEffect(() => {
    dispatch(initialUsers())
  }, [])
  return (
    <>
      {users.map((user) => (
        <div key={user.id} style={{ borderLeft: '1px solid #ddd', margin: '1rem', padding: '0.5rem' }}>
          <div style={{ padding: '0.2rem 0' }}>
            Name: <span style={{ color: 'lightblue' }}> {user.username}</span>
          </div>
          <div style={{ padding: '0.2rem 0' }}>
            blogs: <span style={{ color: 'lightcoral' }}> {user.blogs.length}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Users
