import { PartsProps } from '../types/types'

const Total = ({ courseParts }: PartsProps) => {
  return <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
}

export default Total
