import { useState, useEffect } from 'react'
import { getUnsplashBackground } from '../utils/getUnsplashBackground'

import Background from './Background'

// if last api call was under half an hour, return saved image url
// else
// call api and get image url
// save image url as localBackgroundUrl
// save current date as lastUnsplashApiCallDate
const BackgroundContainer = () => {
  const [backgroundUrl, setBackgroundUrl] = useState('')

  useEffect(async () => {
    const { localBackgroundUrl, lastUnsplashApiCallDate } = JSON.parse(window.localStorage.getItem('yaspage'))

    const secDiff = secElapsedFromNow(lastUnsplashApiCallDate)

    if (secDiff < (10 * 60)) {
      setBackgroundUrl(localBackgroundUrl)
    } else {
      const apiBackgroundUrl = await getUnsplashBackground()
      window.localStorage.setItem('yaspage', JSON.stringify({
        localBackgroundUrl: apiBackgroundUrl,
        lastUnsplashApiCallDate: new Date()
      }))
      setBackgroundUrl(apiBackgroundUrl)
    }

  }, [])

  return (
    <Background url={backgroundUrl}/>
  )
}

const secElapsedFromNow = (givenDate) => {
  const diffTime = new Date() - new Date(givenDate)
  return (diffTime / 1000)
}


export default BackgroundContainer