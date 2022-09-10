import { configureStore } from '@reduxjs/toolkit'
import notification from './reducers/notificationReducer'
import blogs from './reducers/blogReducer'
import users from './reducers/userReducer'
const store = configureStore({
  reducer: {
    notification,
    blogs,
    users,
  },
})

export default store
