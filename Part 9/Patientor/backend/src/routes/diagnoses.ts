import express from 'express'
import getEntries from '../../services/diagnosesService'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(getEntries())
})

export default router
