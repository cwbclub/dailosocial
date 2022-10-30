export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'AUTHREADY':
      return { isAuthReady: true, user: action.payload }
    default:
      return state
  }
}
