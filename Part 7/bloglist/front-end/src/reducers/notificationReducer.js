import { createSlice } from '@reduxjs/toolkit'

const notification = createSlice({
  name: 'notification',
  initialState: { type: '', content: '' },
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

const { createNotification } = notification.actions

let timer
export const setNotification = (content, time = 1) => {
  return (dispatch) => {
    dispatch(createNotification(content))
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => dispatch(createNotification('')), time * 1000)
  }
}

export default notification.reducer
