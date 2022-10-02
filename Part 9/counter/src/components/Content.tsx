import { PartsProps } from '../types/types'

const Content = ({ courseParts }: PartsProps) => {
  return (
    <div>
      {courseParts.map((part) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
