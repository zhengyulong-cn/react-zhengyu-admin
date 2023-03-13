import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../index"

interface IPost {
  id: string
  title: string
  content: string
}

const initialState: Array<IPost> = [
  { id: '1', title: 'First Post!', content: '你好!'},
  { id: '2', title: 'Second Post!', content: 'Hello World!'},
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(addPostAsyncOuter.pending, (state, action) => {
      state.status = 'loading'
    }).addCase(addPostAsyncOuter.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    }).addCase(addPostAsyncOuter.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const addPostAsync = createAsyncThunk(
  'posts/addPostAsync',
  (post: IPost) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve({
            test: 'addPostAsync函数测试',
            post,
          })
        }, 1000)
      } catch (error) {
        reject({
          test: 'reject error',
          post,
        })
      }
    })
  }
)

export const addPostAsyncOuter = createAsyncThunk(
  'outer/addPostAsyncOuter',
  (post: IPost) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve({
            test: 'addPostAsync函数测试',
            post,
          })
        }, 1000)
      } catch (error) {
        reject({
          test: 'reject error',
          post,
        })
      }
    })
  }
)

export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
