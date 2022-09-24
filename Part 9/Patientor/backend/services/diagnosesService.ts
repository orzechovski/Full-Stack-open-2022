import staticDiagnoses from '../data/diagnoses.json'
import { diagnosesEntry } from '../src/types'

const diagnoses: Array<diagnosesEntry> = staticDiagnoses

const getEntries = (): Array<diagnosesEntry> => {
  return diagnoses
}
export default getEntries
