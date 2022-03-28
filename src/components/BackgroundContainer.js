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

  // get image urls from Unsplash API and set them in localStorage
  const getImageUrlsAndSetLocalStorage = async () => {
    const apiBackgroundUrls = await getUnsplashBackground()
    const apiHighResUrl = apiBackgroundUrls.raw + '&q=85&w=1920'
    const apiLowResUrl = apiBackgroundUrls.small

    window.localStorage.setItem('yaspage', JSON.stringify({
      localHighBackgroundUrl: apiHighResUrl,
      localLowBackgroundUrl: apiLowResUrl,
      lastUnsplashApiCallDate: new Date()
    }))

    return {
      apiHighResUrl,
      apiLowResUrl
    }
  }

  useEffect(() => {
    // if no localStorage 'yaspage', set localStorage with defaults
    if (!window.localStorage.getItem('yaspage')) {
      window.localStorage.setItem('yaspage', JSON.stringify({
        localHighBackgroundUrl: CONFIG.defaultHighResBackgroundUrl,
        localLowBackgroundUrl: CONFIG.defaultLowResBackgroundUrl,
        lastUnsplashApiCallDate: new Date()
      }))
    }

    // get localStorage 'yaspage'
    const { localHighBackgroundUrl, localLowBackgroundUrl, lastUnsplashApiCallDate } = JSON.parse(window.localStorage.getItem('yaspage'))

    const secDiff = secElapsedFromNow(lastUnsplashApiCallDate)
    // has 10min passed? get a new background, otherwise use local background
    if (secDiff < (10 * 60)) {
      setHighResUrl(localHighBackgroundUrl)
      setLowResUrl(localLowBackgroundUrl)
      setApiPending(false)
    } else {
      getImageUrlsAndSetLocalStorage().then(({ apiHighResUrl, apiLowResUrl }) => {
        setHighResUrl(apiHighResUrl)
        setLowResUrl(apiLowResUrl)
        setApiPending(false)
      })
    }
  }, [])

  return (
    !apiPending && <Background highResUrl={highResUrl} lowResUrl={lowResUrl} />
  )
}

const secElapsedFromNow = (givenDate) => {
  const diffTime = new Date() - new Date(givenDate)
  return (diffTime / 1000)
}


export default BackgroundContainer