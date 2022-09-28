import express from 'express'
import { getNonSensetiveEntries, addPatient } from '../../services/patientsService'
import { toNewPatientEntry } from '../utils'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(getNonSensetiveEntries())
})

router.post('/', (req, res) => {
  const newPatient = toNewPatientEntry(req.body)
  res.send(addPatient(newPatient))
})

export default router
