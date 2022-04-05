import CONFIG from '../config'

const gosuMatchCellParser = {
  matchLink: (matchCell) => CONFIG.gosuApi.gosuDota2Url.concat(matchCell
    .rawAttrs
    .match(/href\s*=\s*"(.+?)"/)[1]),

  matchTournament: (matchCell) => matchCell
    .querySelector('div.grid-x.match > div.cell.match-info > div.grid-x > div.cell.match-tournament')
    .textContent
    .trim(),

  matchTimestamp: (matchCell) => new Date(matchCell
    .querySelector('div.grid-x.match > div.cell.match-status > span.post-date > time')
    .rawAttrs
    .match(/datetime\s*=\s*"(.+?)"/)[1]
  ),

  teamLeft: {
    abbreviatedTitle: (matchCell) => matchCell
      .querySelector('div.grid-x.match > div.cell.match-info > div.grid-x > div.cell > span.team-1')
      .textContent
      .trim(),
  },

  teamRight: {
    abbreviatedTitle: (matchCell) => matchCell
      .querySelector('div.grid-x.match > div.cell.match-info > div.grid-x > div.cell > span.team-2')
      .textContent
      .trim(),
  }

}

export default gosuMatchCellParser