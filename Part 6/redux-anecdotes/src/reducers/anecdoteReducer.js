import { createSlice } from '@reduxjs/toolkit'
import { getAll, create, update } from '../services/anecdotes'
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
const { vote, addAnecdote, addAnecdotes } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecodotes = await getAll()
    dispatch(addAnecdotes(anecodotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await create(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const updatedAnecdote = (id, content, votes) => {
  return async (dispatch) => {
    const anecdote = await update(id, { content, id, votes: votes + 1 })
    dispatch(vote(anecdote))
  }
}

export default anecdoteReducer.reducer
