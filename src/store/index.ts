import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsSlice'

// 配置store
const store = configureStore({
  reducer: {
    posts: postsReducer,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
