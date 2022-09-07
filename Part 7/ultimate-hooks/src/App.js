import { useState, useEffect } from 'react'
import './styles/App.css'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources([...response.data])
  }
  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const service = {
    create,
    getAll,
  }

  return [resources, service]
}

const App = () => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetNumber, ...number } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    resetContent()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    resetName()
    resetNumber()
  }

  useEffect(() => {
    personService.getAll()
    noteService.getAll()
  }, [])

  return (
    <main>
      <div>
        <h2>notes</h2>
        <form onSubmit={handleNoteSubmit}>
          <input {...content} />
          <button>create</button>
        </form>
        <div className="list">
          {notes.map((n) => (
            <p key={n.id}>{n.content}</p>
          ))}
        </div>
      </div>
      <div>
        <h2>persons</h2>
        <form onSubmit={handlePersonSubmit}>
          name <input {...name} /> <br />
          number <input {...number} />
          <button>create</button>
        </form>
        <div className="list">
          {persons.map((n) => (
            <p key={n.id}>
              {n.name} {n.number}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
