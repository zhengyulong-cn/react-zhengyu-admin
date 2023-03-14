import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// 配置store
const store = configureStore({
  reducer: {
    postStore: postsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
