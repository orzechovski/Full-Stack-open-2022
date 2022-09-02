import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnectdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const handleClick = (id, content) => {
    dispatch(vote(id))
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
          <button onClick={() => handleClick(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    ))
}

export default AnectdoteList
