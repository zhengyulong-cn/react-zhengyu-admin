import store from "./store";
import { Provider } from 'react-redux'
import "./App.css"
import PostsForm from "./views/PostsForm";
// 在顶部通过Provider提供整个store
export default function App() {
  return <Provider store={store}>
    <PostsForm />
  </Provider>
}
