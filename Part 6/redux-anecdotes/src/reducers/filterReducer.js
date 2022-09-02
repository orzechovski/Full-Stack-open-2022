import { createSlice } from '@reduxjs/toolkit'

const filterChange = (payload) => ({ type: 'filter/setFilter', payload })

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
})
export { filterChange }
export default filterReducer.reducer
