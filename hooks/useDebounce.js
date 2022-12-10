import { useEffect, useState } from 'react'

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const tracker = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(tracker)
  }, [value, delay])
  return debounceValue
}
