import './styles/App.css'
import { Routes, Route, Link, useNavigate, useParams, useMatch } from 'react-router-dom'
import { useField } from './hooks'
import { useState } from 'react'

const Menu = () => {
  return (
    <nav>
      <Link to="/anecdotes">anecdotes</Link>
      <Link to="/create">create new</Link>
      <Link to="/about">about</Link>
    </nav>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div className="anecdoteList">
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link to={`/anecdotes/${anecdote.id}`} key={anecdote.id}>
          {anecdote.content}
        </Link>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  const { content, votes, info, author } = anecdote
  return (
    <div>
      <h2>{content}</h2>
      <p>has {votes} likes</p>
      <p>created by: {author}</p>
      <p>
        visit:
        <a target="_blanck" href={info}>
          {info}
        </a>
      </p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally humorous, anecdotes differ from jokes because their primary
      purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, such as to characterize a person by delineating a
      specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. An anecdote is
      "a story with a point."
    </em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <footer>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </footer>
)

const Notification = ({ notification }) => <div style={{ border: '1px solid lightyellow', color: 'yellow', padding: '2em' }}>{notification}</div>

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')
  const navigate = useNavigate()

  const reset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    navigate('/anecdotes')
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNotification = ({ content, author }) => {
    setNotification(`Added anecdote: "${content}" by ${author} `)
    setTimeout(() => setNotification(''), 5000)
  }
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    addNotification(anecdote)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find((e) => e.id === parseInt(match.params.id)) : null

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Notification notification={notification} />
      <Footer />
    </>
  )
}

export default App
