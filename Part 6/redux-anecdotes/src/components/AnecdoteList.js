import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes, updatedAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnectdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const handleClick = async ({ id, content, votes }) => {
    dispatch(updatedAnecdote(id, content, votes))
    dispatch(setNotification(content, 5))
  }
  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter((e) => (filter ? e.content.toLowerCase().includes(filter.toLowerCase()) : e))
    .map((anecdote) => (
      <div key={anecdote.id} className="anecdote">
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleClick(anecdote)}>vote</button>
        </div>
      </div>
    ))
}

export default AnectdoteList
