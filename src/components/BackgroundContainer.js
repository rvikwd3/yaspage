import { useState, useEffect } from 'react'
import CONFIG from '../config'
import { getUnsplashBackground } from '../utils/getUnsplashBackground'

import Background from './Background'

// if last api call was under half an hour, return saved image url
// else
// call api and get image url
// save image url as localBackgroundUrl
// save current date as lastUnsplashApiCallDate
const BackgroundContainer = () => {
  const [highResUrl, setHighResUrl] = useState('')
  const [lowResUrl, setLowResUrl] = useState('')
  const [apiPending, setApiPending] = useState(true)

  useEffect(async () => {
    if (!window.localStorage.getItem('yaspage')){
      window.localStorage.setItem('yaspage', JSON.stringify({
        localBackgroundUrl: CONFIG.defaultBackgroundUrl,
        lastUnsplashApiCallDate: new Date()
      }))
    }

    const { localBackgroundUrl, lastUnsplashApiCallDate } = JSON.parse(window.localStorage.getItem('yaspage'))

    const secDiff = secElapsedFromNow(lastUnsplashApiCallDate)

    if (secDiff < (10 * 60)) {
      setHighResUrl(localBackgroundUrl)
      setApiPending(false)
    } else {
      const apiBackgroundUrls = await getUnsplashBackground()
      const apiHighResUrl = apiBackgroundUrls.raw + '&q=85&w=1920'
      const apiLowResUrl = apiBackgroundUrls.small

      setHighResUrl(apiHighResUrl)
      setLowResUrl(apiLowResUrl)
      setApiPending(false)

      window.localStorage.setItem('yaspage', JSON.stringify({
        localBackgroundUrl: apiHighResUrl,
        lastUnsplashApiCallDate: new Date()
      }))
    }

  }, [])

  return (
    !apiPending && <Background highResUrl={highResUrl} lowResUrl={lowResUrl}/>
  )
}

const secElapsedFromNow = (givenDate) => {
  const diffTime = new Date() - new Date(givenDate)
  return (diffTime / 1000)
}


export default BackgroundContainer