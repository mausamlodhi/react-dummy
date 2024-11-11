import { useEffect, useRef } from 'react'

const useCloseClickOutside = (callback) => {
  const ref = useRef()

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClick)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return ref
}

export default useCloseClickOutside
