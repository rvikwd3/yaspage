import { useState, useEffect } from 'react'
import axios from 'axios'
import { parse } from 'node-html-parser'

import CONFIG from '../config'
import buildLiquipediaMatchObject from '../utils/buildLiquipediaMatchObject'

const secElapsedFromNow = (givenDate) => {
  const diffTime = new Date() - new Date(givenDate)
  return (diffTime / 1000)
}

const useUpcomingMatchesFromLiquipediaAPI = () => {
  const [loading, setLoading] = useState(true)
  const [upcomingMatchesJSON, setUpcomingMatchesJSON] = useState(null)

  // check if matches table is already stored in localStorage
  // if timeElapsed is 10min, call API
  // otherwise use matchTablesJSON from localStorage

  const callApi = (url, config, callback) => {
    axios
      .get(url, config)
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        return parse(json.parse.text).querySelectorAll('.infobox_matches_content')
      })
      .then(matchTables => {
        const matchTablesJSON = matchTables
          .slice(0, CONFIG.liquipediaApi.upcomingMatchesLimit)
          .map(match => buildLiquipediaMatchObject(match))

        console.log('matchTablesJSON built:', matchTablesJSON)

        setLoading(false)
        setUpcomingMatchesJSON(matchTablesJSON)
        callback(matchTablesJSON)
        return matchTablesJSON
      })
  }

  const url = CONFIG.liquipediaApi.upcomingMatchesApiUrl
  const config = {
    headers: {
      'User-Agent': 'yaspage/1.0/dota2-upcoming-matches-panel',
      'Accept-Encoding': 'gzip',
    }
  }

  useEffect(() => {
    // No previous matches loaded
    if (!window.localStorage.getItem('upcomingMatchesApi')) {
      window.localStorage.setItem('upcomingMatchesApi', JSON.stringify({
        localUpcomingMatches: CONFIG.liquipediaApi.defaultMatches,
        lastLiquipediaApiCallDate: new Date(),
      }))
    }

    const { localUpcomingMatches, lastLiquipediaApiCallDate } = JSON.parse(window.localStorage.getItem('upcomingMatchesApi'))
    if (secElapsedFromNow(lastLiquipediaApiCallDate) < (5 * 60)) {
      console.log('Localstorage item found')
      setLoading(false)
      setUpcomingMatchesJSON(localUpcomingMatches)
    } else {
      console.log(`Last call date: ${lastLiquipediaApiCallDate}\nLocalstorage item not found, %ccalling Liquipedia API`, 'color: hotpink;')
      callApi(url, config, (matchTablesJSON) => {
        window.localStorage.setItem('upcomingMatchesApi', JSON.stringify({
          localUpcomingMatches: matchTablesJSON,
          lastLiquipediaApiCallDate: new Date(),
        }))
      })
    }
  }, [])

  return { loading, upcomingMatchesJSON }

}

export default useUpcomingMatchesFromLiquipediaAPI