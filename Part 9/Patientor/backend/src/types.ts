export interface diagnosesEntry {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export interface patientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
}
export type NewPatientEntry = Omit<patientEntry, 'id'>

export type NonSensitivePatientEntry = Omit<patientEntry, 'ssn'>
