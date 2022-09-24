export interface diagnosesEntry {
  code: string
  name: string
  latin?: string
}

// type Gender = 'male' | 'female'

export interface patientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
}

export type NonSensitivePatientEntry = Omit<patientEntry, 'ssn'>
