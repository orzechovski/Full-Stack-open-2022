import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

const { createNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(createNotification(content))
    setTimeout(() => dispatch(createNotification('')), time * 1000)
  }
}

export default notificationSlice.reducer
