import { createAsyncThunk, createSlice, createSelector, createEntityAdapter  } from "@reduxjs/toolkit"
import type { RootState } from "../index"

interface IPost {
  id: string
  title: string
  content: string
}
interface IState {
  posts: Array<IPost>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: any
}

const initialState: IState = {
  posts: [
    { id: '1', title: 'First Post!', content: '你好!'},
    { id: '2', title: 'Second Post!', content: 'Hello World!'},
  ],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(addPostAsync.pending, (state, action) => {
      state.status = 'loading'
    }).addCase(addPostAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    }).addCase(addPostAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }).addCase(addPostAsyncOuter.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    })
  }
})

export const addPostAsync = createAsyncThunk(
  'posts/addPostAsync',
  (post: IPost): Promise<Array<IPost>> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve([
            { id: '101', title: '1 Post!', content: 'resolve thunk 101'},
            { id: '102', title: '2 Post!', content: 'resolve thunk 102'},
          ])
        }, 1000)
      } catch (error) {
        reject([
          { id: '103', title: '3 Post!', content: 'reject thunk 10３'},
        ])
      }
    })
  }
)

export const addPostAsyncOuter = createAsyncThunk(
  'outer/addPostAsyncOuter',
  (post: IPost): Promise<Array<IPost>> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve([
            { id: '104', title: '4 Post! --- outer', content: 'resolve thunk 104'},
            { id: '105', title: '5 Post! --- outer', content: 'resolve thunk 105'},
          ])
        }, 1000)
      } catch (error) {
        reject([
          { id: '106', title: '6 Post! --- outer', content: 'resolve thunk 106'},
        ])
      }
    })
  }
)

export const selectAllPosts = (state: RootState) => state.postStore.posts
export const selectPostStatus = (state: RootState) => state.postStore.status
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.id === userId)
)

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
