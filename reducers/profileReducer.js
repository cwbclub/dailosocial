export default function ProfileReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, photos: action.photos, blogs: action.blogs }
    case 'DONE':
      return { ...state, loading: false }
    case 'RESET':
      return { ...state, photos: [], blogs: [], loading: true }
    default:
      return state
  }
}
