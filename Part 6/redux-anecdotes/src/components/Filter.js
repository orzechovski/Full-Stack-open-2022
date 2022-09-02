import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = () => {
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(filterChange(e.target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter
