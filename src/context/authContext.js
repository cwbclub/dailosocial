import { createContext, useContext, useReducer } from 'react'
import { AuthReducer } from '../reducers/authReducer'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const INITIAL_STATE = {
  user: null,
  isAuthReady: false,
}

export default function AuthContextProvider({ children }) {
  const [data, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider value={{ ...data, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
