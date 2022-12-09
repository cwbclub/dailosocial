import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()
export const useLayoutData = () => useContext(LayoutContext)

export default function LayoutContextProvider({ children }) {
  const [grid, setGrid] = useState(true)
  return (
    <LayoutContext.Provider value={{ grid, setGrid }}>
      {children}
    </LayoutContext.Provider>
  )
}
