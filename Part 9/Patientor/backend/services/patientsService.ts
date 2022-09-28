import { v1 as uuid } from 'uuid'
import staticPatients from '../data/patients.json'
import { patientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../src/types'

const patients: Array<patientEntry> = staticPatients

const getEntries = (): Array<patientEntry> => {
  return patients
}

const getNonSensetiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }))
}

const addPatient = ({ name, ssn, dateOfBirth, gender, occupation }: NewPatientEntry): patientEntry => {
  const newPatient = { name, ssn, dateOfBirth, gender, occupation, id: uuid() }
  patients.push(newPatient)
  return newPatient
}

export { getEntries, getNonSensetiveEntries, addPatient }
