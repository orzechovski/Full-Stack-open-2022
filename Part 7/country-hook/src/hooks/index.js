import { useState, useEffect } from 'react'
import { getByName } from '../services/countries'
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    const getCountry = async () => {
      const response = name ? await getByName(name) : ''
      setCountry(...response)
    }
    getCountry()
  }, [name])

  return country
}
