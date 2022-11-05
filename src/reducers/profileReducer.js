export default function ProfileReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, photos: action.photos, blogs: action.blogs }
    case 'UID':
      return { ...state, uid: action.payload }
    case 'DONE':
      return { ...state, loading: false }
    default:
      return state
  }
}
