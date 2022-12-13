export default function PostsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
        lastDoc: action.last,
      }
    case 'MERGE':
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        postsLoading: false,
        lastDoc: action.last,
      }
    case 'DONE':
      return { ...state, postsLoading: false }
    case 'EMPTY':
      return { ...state, postsLoading: false, isEmpty: true }
    case 'START':
      return { ...state, postsLoading: true }
    default:
      return state
  }
}
