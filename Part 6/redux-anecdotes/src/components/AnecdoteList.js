import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAll, updateAnecdote } from '../services/anecdotes'
import { vote, addAnecdotes } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnectdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    getAll().then((res) => dispatch(addAnecdotes(res)))
  }, [dispatch])

  const handleClick = async ({ id, content, votes }) => {
    const updatedAnecdote = await updateAnecdote(id, { content, id, votes: votes + 1 })
    dispatch(vote(updatedAnecdote))
    dispatch(addNotification(content))
    setTimeout(() => dispatch(removeNotification()), 5000)
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
