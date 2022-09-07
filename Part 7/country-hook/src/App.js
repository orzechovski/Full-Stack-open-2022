import './styles/App.css'
import { useState } from 'react'
import Country from './components/Country'
import SearchCountry from './components/SearchCountry'

const App = () => {
  const [name, setName] = useState('')
  return (
    <>
      <SearchCountry setName={setName} />
      <Country name={name} />
    </>
  )
}

export default App
