import { createSlice } from '@reduxjs/toolkit'

const addNotification = (payload) => ({ type: 'notification/createNotification', payload })
const removeNotification = () => ({ type: 'notification/createNotification', payload: '' })

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '' },
  reducers: {
    createNotification(state, action) {
      return { content: action.payload }
    },
  },
})
export { addNotification, removeNotification }
export default notificationSlice.reducer
