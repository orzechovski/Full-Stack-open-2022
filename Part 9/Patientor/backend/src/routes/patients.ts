import express from 'express'
import { getNonSensetiveEntries } from '../../services/patientsService'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(getNonSensetiveEntries())
})

export default router
