import { useEffect } from 'react'

export default function useSeo(title) {
  useEffect(() => {
    document.querySelector('title').innerHTML = `${title} | DailoSocial`
  }, [title])
}
