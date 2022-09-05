import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = (props) => {
  const filter = props.filter
  const handleChange = (e) => {
    props.filterChange(e.target.value)
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

const mapDispatchToProps = { filterChange }
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
