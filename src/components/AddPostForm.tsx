import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, useState } from "react";
import { addPostAsync, addPostAsyncOuter, postAdded, selectPostStatus } from "../store/reducers/postsSlice";
import { useAppDispatch, useAppSelector } from '../store/index'
const initFormData = {
  title: '',
  content: '',
}
const AddPostForm = () => {
  const [formData, setFormData] = useState(initFormData)
  const dispatch = useAppDispatch()
  const postStatus = useAppSelector(selectPostStatus)
  const onSavePostClicked = () => {
    if(formData.title && formData.content) {
      dispatch(addPostAsync({
        id: nanoid(),
        title: formData.title,
        content: formData.content,
      }))
      setFormData(initFormData)
    }
  }
  return (
    <div>
      <p className="text-2xl font-bold text-cyan-600">Add a new post</p>
      <form>
        <label htmlFor="postTitle">Post Title：</label>
        <input
          className="border-2 border-black"
          type="text"
          id="postTitle"
          name="postTitle"
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value})}
        />
        <label htmlFor="postContent">Content：</label>
        <input
          className="border-2 border-black"
          type="text"
          id="postContent"
          name="postContent"
          value={formData.content}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, content: e.target.value})}
        />
        <button className="block m-2 p-2 text-white bg-blue-500 hover:bg-blue-600" type="button" onClick={onSavePostClicked}>
        { postStatus } --- Save Post
        </button>
      </form>
    </div>
  )
}
export default AddPostForm;
