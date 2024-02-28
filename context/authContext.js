import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { auth } from '../lib/firebase'
import { AuthReducer } from '../reducers/authReducer'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const INITIAL_STATE = {
  user: null,
  isAuthReady: false,
}

export default function AuthContextProvider({ children }) {
  const [data, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      dispatch({ type: 'AUTHREADY', payload: authUser })
    })

    return () => unsub && unsub()
  }, [auth])

  return (
    <AuthContext.Provider value={{ ...data, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
