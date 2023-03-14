import { selectAllPosts, selectPostsByUser } from "../store/reducers/postsSlice";
import { useAppSelector } from '../store/index'

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)
  const postsForUser = useAppSelector(state => selectPostsByUser(state, '102'))
  return (
    <section>
      <p className="text-2xl font-bold">Posts</p>
      { posts.map(post => (
        <article key={post.id} className="border-2 border-black rounded-md my-2">
          <p className="text-red-500 text-xl">{post.title}</p>
          <p>{post.content}</p>
        </article>
      ))}
      <div>
        <p>选中的值：</p>
        { postsForUser.map(post => (
          <p key={post.id}>{post.title} - {post.content}</p>
        ))}
      </div>
    </section>
  )
}
export default PostsList;
