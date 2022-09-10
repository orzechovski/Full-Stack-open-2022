import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/users'

const userReducer = createSlice({
  name: 'users',
  initialState: { logedUser: null, users: [] },
  reducers: {
    setUser(state, action) {
      return { ...state, logedUser: action.payload }
    },
    setUsers(state, action) {
      return { ...state, users: action.payload }
    },
  },
})

const { setUser, setUsers } = userReducer.actions

export const userSet = (user) => {
  return (dispatch) => {
    dispatch(setUser(user))
  }
}

export const initialUsers = () => {
  return async (dispatch) => {
    const response = await getAll()
    dispatch(setUsers(response))
  }
}

export default userReducer.reducer
