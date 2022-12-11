export default function ProfileReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, photos: action.photos, blogs: action.blogs }
    case 'DONE':
      return { ...state, loading: false }
    case 'START':
      return { ...state, loading: true }
    case 'RESET':
      return { ...state, photos: [], blogs: [] }
    default:
      return state
  }
}
