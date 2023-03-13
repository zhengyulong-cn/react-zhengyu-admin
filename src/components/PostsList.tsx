import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/reducers/postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  return (
    <section>
      <p className="text-2xl font-bold">Posts</p>
      { posts.map(post => (
        <article key={post.id} className="border-2 border-black rounded-md my-2">
          <p className="text-red-500 text-xl">{post.title}</p>
          <p>{post.content}</p>
        </article>
      ))}
    </section>
  )
}
export default PostsList;
