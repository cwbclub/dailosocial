import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-hot-toast'
import PostsReducer from '../reducers/postsReducer'
import { getAllPosts } from '../utils/firebase'
import { useAuth } from './authContext'
import { useFriends } from './friendsContext'

const PostsContext = createContext()

export const usePosts = () => useContext(PostsContext)

const INITIAL_STATE = {
  posts: [],
  postsLoading: true,
  isEmpty: false,
  lastDoc: null,
}

export default function PostsContextProvider({ children }) {
  const [state, dispatch] = useReducer(PostsReducer, INITIAL_STATE)
  const { lastDoc } = state
  const { followings, loading } = useFriends()
  const { user } = useAuth()
  const myuid = user?.uid

  const handleData = async (more) => {
    dispatch({ type: 'START' })
    try {
      const result = await getAllPosts(
        followings,
        myuid,
        more ? lastDoc : false
      )
      if (result?.res) {
        const { res, last } = result
        more
          ? dispatch({ type: 'MERGE', payload: res, last })
          : dispatch({ type: 'ADD', payload: res, last })
      } else {
        dispatch({ type: 'EMPTY' })
      }
    } catch (error) {
      console.error(error)
      toast.error(<b>{error.message}</b>)
      dispatch({ type: 'DONE' })
    }
  }

  useEffect(() => {
    !loading && handleData()
  }, [loading, followings, myuid])

  return (
    <PostsContext.Provider value={{ ...state, handleData }}>
      {children}
    </PostsContext.Provider>
  )
}
