import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { exerciseCalculator } from './exerciseCalculator'
const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi/', (req, res) => {
  try {
    const height = parseInt(req.query.height as unknown as string)
    const weight = parseInt(req.query.weight as unknown as string)
    const bmi = calculateBmi(height, weight)
    if (!isNaN(weight) && !isNaN(height)) {
      res.send({ ...req.query, bmi: bmi })
    } else {
      res.status(400).json({ error: 'malformatted parameters' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

app.post('/calculate', (req, res) => {
  const { daily_exercises, target } = req.body
  try {
    if (daily_exercises.length < 7 || isNaN(target)) {
      return res.status(400).send({ error: 'parameters missing' })
    }

    const calculatedExercises = exerciseCalculator(daily_exercises, target)
    return res.status(200).json(calculatedExercises)
  } catch (error) {
    return console.log(error)
  }
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`)
})
