import { useState, useEffect } from 'react'
import axios from 'axios'

import buildGosuMatchesTable from '../utils/buildGosuMatchesTable'
import CONFIG from '../config'

const getLastApiCallDate = () => {
  // eslint-disable-next-line no-unused-vars
  const { lastApiCallDate, ...rest } = JSON.parse(window.localStorage.getItem('upcomingMatchesApi'))
  return lastApiCallDate
}

const secElapsedFromNow = (givenDate) => {
  const diffTime = new Date() - new Date(givenDate)
  return (diffTime / 1000)
}

const useGosuUpcomingMatches = () => {
  const [loading, setLoading] = useState(true)
  const [upcomingMatchesJSON, setUpcomingMatchesJSON] = useState(null)

  // check if matches table is already stored in localStorage
  // if timeElapsed is 10min, call GosuParser
  // otherwise use matchTablesJSON from localStorage

  const callApi = async (url, callback) => {
    const response = await axios.get(url)
    const matchTablesJson = await buildGosuMatchesTable(response.data)
    callback(matchTablesJson)
    return matchTablesJson
  }

  const url = CONFIG.corsAnywhere.concat(CONFIG.gosuApi.upcomingMatchesListUrl)

  useEffect(() => {
    const localData = window.localStorage.getItem('upcomingMatchesApi')

    /* if localMatches available and are stale */
    if (!localData || secElapsedFromNow(getLastApiCallDate()) > (CONFIG.upcomingMatchesMinutesTillLocalDataStale * 60)) {
      callApi(url, (matchTablesJson) => {
        window.localStorage.setItem('upcomingMatchesApi', JSON.stringify({
          localUpcomingMatches: matchTablesJson,
          lastApiCallDate: new Date(),
        }))
        setUpcomingMatchesJSON(matchTablesJson)
        setLoading(false)
      })
      return
    }

    /* If localMatches doesn't exist OR localMatches are stale */
    // eslint-disable-next-line no-unused-vars
    const { localUpcomingMatches, ...rest } = JSON.parse(window.localStorage.getItem('upcomingMatchesApi'))
    setUpcomingMatchesJSON(localUpcomingMatches)
    setLoading(false)
    return
  }, [])

  return { loading, upcomingMatchesJSON }
}

export default useGosuUpcomingMatches