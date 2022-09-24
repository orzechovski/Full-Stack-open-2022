import staticPatients from '../data/patients.json'
import { patientEntry, NonSensitivePatientEntry } from '../src/types'

const patients: Array<patientEntry> = staticPatients

const getEntries = (): Array<patientEntry> => {
  return patients
}

export const getNonSensetiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }))
}

export default getEntries
