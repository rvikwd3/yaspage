import { useState, useEffect } from 'react'

const ProgressiveImageFC = ({ src, placeholder }) => {
  const [loading, setLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(placeholder)

  const style = ({
    width: '100%',
    height: '100%',
    opacity: loading ? '0.5' : '1',
    transition: 'opacity .5s ease-out',
    objectFit: 'cover',
  })

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
      style={style}
      src={currentSrc}
      className="ProgressiveImage"
    />
  )
}

export default ProgressiveImageFC