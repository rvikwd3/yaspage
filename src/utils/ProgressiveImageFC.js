import { useState, useEffect } from 'react'

const ProgressiveImageFC = ({ src, placeholder }) => {
  const [loading, setLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(placeholder)

  useEffect( () => {
    const imageToLoad = new Image()
    imageToLoad.src = src
    imageToLoad.onload = () => {
      setCurrentSrc(src)
      setLoading(false)
    }
  }, [])

  return (
    <img
      src={currentSrc}
      className="ProgressiveImage"
    />
  )
}

export default ProgressiveImageFC