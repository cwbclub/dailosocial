import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()
export const useLayoutData = () => useContext(LayoutContext)

export default function LayoutContextProvider({ value, children }) {
  const [grid, setGrid] = useState(false)
  return (
    <LayoutContext.Provider value={{ grid, setGrid }}>
      {children}
    </LayoutContext.Provider>
  )
}
