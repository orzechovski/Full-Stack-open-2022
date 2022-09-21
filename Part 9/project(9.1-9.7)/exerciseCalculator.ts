interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface properlyValues {
  trainingDays: Array<number>
  intendetTarget: number
}

const parseArgs = (args: Array<string>): properlyValues => {
  if (args.length !== 10) throw new Error('There should be only 8 arguments')

  if (!isNaN(parseInt(args[2])) && !isNaN(parseInt(args[3]))) {
    return {
      trainingDays: [...args.slice(4).map((e) => parseInt(e))],
      intendetTarget: parseInt(args[2]),
    }
  } else {
    throw new Error('Wrong types of agruments')
    return { trainingDays: [], intendetTarget: 0 }
  }
}

export const exerciseCalculator = (trainingDays: Array<number>, intendetTarget: number): Result => {
  const period = trainingDays.length
  const daysOfTraining = trainingDays.filter((e) => e > 0).length
  const finalRating = daysOfTraining - intendetTarget > 0 ? 3 : daysOfTraining - intendetTarget === 0 ? 2 : 1
  const finalDescription = finalRating === 3 ? 'quite good' : finalRating === 2 ? 'not bad but could be better' : 'its just bad'
  const summary = {
    periodLength: period,
    trainingDays: daysOfTraining,
    success: intendetTarget >= period,
    rating: finalRating,
    ratingDescription: finalDescription,
    target: intendetTarget,
    average: trainingDays.reduce((a, b) => a + b, 0) / period,
  }
  console.log(summary)
  return summary
}

try {
  const { trainingDays, intendetTarget } = parseArgs(process.argv)
  exerciseCalculator(trainingDays, intendetTarget)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
