interface Values {
  weight: number
  height: number
}
const parseArguments = (args: Array<string>): Values => {
  if (args.length !== 4) throw new Error('There should be only 2 arguments')

  if (!isNaN(parseInt(args[2])) && !isNaN(parseInt(args[3]))) {
    return {
      weight: parseInt(args[2]),
      height: parseInt(args[3]),
    }
  } else {
    throw new Error('Wrogn types of arguments')
    return {
      weight: 0,
      height: 0,
    }
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)
  let message = ''
  if (bmi < 18.5) {
    message = 'you are too skinny'
  } else if (bmi < 24.99) {
    message = 'healthy weight'
  } else {
    message = 'Overweight'
  }
  console.log(message)
  return message
}

try {
  const { weight, height } = parseArguments(process.argv)
  calculateBmi(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
