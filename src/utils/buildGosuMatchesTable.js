import axios from 'axios'
import { parse } from 'node-html-parser'
import CONFIG from '../config'
import gosuMatchCellParser from './gosuMatchCellParser'
import gosuMatchPageParser from './gosuMatchPageParser'

const buildGosuMatchesTable = async (html) => {
  const matchCells = parse(html).querySelectorAll('.grid-x.match-list > .cell > a').slice(0, CONFIG.gosuApi.upcomingMatchesLimit)

  // for each matchCell fetch matchPage
  // after fetching matchPage, build the match details json object

  const matchDetailsListPromise = Promise.all(matchCells.map((cell) => {
    const isMatchLive = cell.querySelector('div.grid-x.match > div.match-status').textContent.trim() === 'Live'
    return axios
      .get(CONFIG.corsAnywhere + gosuMatchCellParser.matchLink(cell))
      .then(pageHtml => {
        const matchPage = parse(pageHtml.data)
        const teams = gosuMatchPageParser(isMatchLive).teams(matchPage)

        const streamUrlLookup = (gosuStream) => {
          return gosuStream && CONFIG.streamTable?.[gosuStream]
        }

        const match = {
          matchLink: gosuMatchCellParser.matchLink(cell),
          matchTournament: gosuMatchCellParser.matchTournament(cell),
          stream: streamUrlLookup(gosuMatchPageParser(isMatchLive).stream(matchPage)),
          matchTimestamp: isMatchLive ? 'Live' : gosuMatchCellParser.matchTimestamp(cell),
          tournamentUrl: gosuMatchPageParser(isMatchLive).tournamentLink(matchPage),
          bestOf: gosuMatchPageParser(isMatchLive).bestOf(matchPage),
          teamLeft: {
            abbreviatedTitle: gosuMatchCellParser.teamLeft.abbreviatedTitle(cell),
            fullTitle: gosuMatchPageParser(isMatchLive).teamParser.fullTitle(teams[0]),
            teamLink: gosuMatchPageParser(isMatchLive).teamParser.teamLink(teams[0]),
            logoUrl: gosuMatchPageParser(isMatchLive).teamParser.logoUrl(teams[0]),
          },
          teamRight: {
            abbreviatedTitle: gosuMatchCellParser.teamRight.abbreviatedTitle(cell),
            fullTitle: gosuMatchPageParser(isMatchLive).teamParser.fullTitle(teams[1]),
            teamLink: gosuMatchPageParser(isMatchLive).teamParser.teamLink(teams[1]),
            logoUrl: gosuMatchPageParser(isMatchLive).teamParser.logoUrl(teams[1]),
          }
        }

        return match
      })
  })).then( matchDetailsList => {
    return matchDetailsList
  })

  return matchDetailsListPromise
}

export default buildGosuMatchesTable