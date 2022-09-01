import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnectdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id} className="anecdote">
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
    ))
}

export default AnectdoteList
