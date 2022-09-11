import { createSlice } from '@reduxjs/toolkit'
import { getAll, create, update, del } from '../services/blogs'

const blogReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    addBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlog(state, action) {
      const newBlog = action.payload
      return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
    },
    delBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

const { addBlogs, addBlog, updateBlog, delBlog } = blogReducer.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const resposne = await getAll()
    dispatch(addBlogs(resposne))
  }
}

export const createdBlog = (blog) => {
  return async (dispatch) => {
    const resposne = await create(blog)
    dispatch(addBlog(resposne))
  }
}

export const updatesBlog = (id, like) => {
  return async (dispatch) => {
    const resposne = await update(id, like)
    dispatch(updateBlog(resposne))
  }
}
export const likeBlog = (id, like) => {
  return async (dispatch) => {
    const resposne = await update(id, like)
    dispatch(updateBlog(resposne))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await del(id)
    dispatch(delBlog(id))
  }
}

export default blogReducer.reducer
