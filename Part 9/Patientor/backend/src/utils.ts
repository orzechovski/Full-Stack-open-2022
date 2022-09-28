import { NewPatientEntry } from './types'
import { Gender } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (text: any): text is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(text)
}

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error('Incorrect or missing data' + name)
  return name
}

const parseGender = (name: unknown): string => {
  if (!name || !isGender(name)) throw new Error('Incorrect or missing gender' + name)
  return name
}

type Field = { name: unknown; ssn: unknown; dateOfBirth: unknown; gender: unknown; occupation: unknown }

const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation }: Field): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    ssn: parseString(ssn),
    dateOfBirth: parseString(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  }
  return newEntry
}

export { toNewPatientEntry }
