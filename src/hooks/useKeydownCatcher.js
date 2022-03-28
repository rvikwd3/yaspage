import { useEffect, useState } from 'react'

const useKeydownCatcher = () => {
  const [keydownEvent, setKeydownEvent] = useState(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeydownEvent(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    // cleanup EventListener on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return keydownEvent
}

export default useKeydownCatcher