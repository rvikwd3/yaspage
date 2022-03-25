import axios from 'axios'

export const getUnsplashBackground = async () => {
  const apiUrl = 'https://api.unsplash.com/photos/random?collections=317099&orientation=landscape'

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Client-ID ' + process.env.UNSPLASH_CLIENT_ID
    }
  }

  let resultUrls = process.env.DEFAULT_BACKGROUND_URL

  try {
    const response = await axios.get(apiUrl, config)
    // resultUrl = response.data.urls.raw + '&q=85&w=1920'
    resultUrls = response.data.urls
  } catch (err) {
    console.log(err)
  }

  return resultUrls
}