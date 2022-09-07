import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/name/{name}?fullText=true'

const getByName = async (name) => {
  const response = await axios.get(baseUrl.replace('{name}', name))
  return response.data
}

export { getByName }
