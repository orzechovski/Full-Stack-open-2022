import './styles/App.css'
import AnecdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification />
      <AnectdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
