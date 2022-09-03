import { createSlice } from '@reduxjs/toolkit'

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addAnecdotes(state, action) {
      return action.payload
    },
    vote(state, action) {
      return state.map((e) => (e.id === action.payload.id ? { ...e, votes: e.votes + 1 } : e))
    },
  },
})
export const { vote, addAnecdote, addAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer
