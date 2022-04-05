import axios from 'axios'
import { useEffect, useState } from 'react'

const useApi = (url, config) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const callApi = () => {
    axios
      .get(url, config)
      .then(response => {
        return response.data
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
  }

  useEffect(() => {
    callApi()
  }, [])

  return { loading, data }
}

export default useApi