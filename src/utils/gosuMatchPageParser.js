import CONFIG from '../config'

const gosuMatchPageParser = (isMatchLive) => {
  return {
    tournamentLink: (matchPageHero) => CONFIG.gosuApi.gosuDota2Url.concat(matchPageHero
      .querySelector('div.cell.match-background > div.grid-y > div.cell.tournament-data.text-center > h1 > a')
      .rawAttrs
      .match(/href\s*=\s*"(.+?)"/)[1]),

    stream: (matchPageHero) => matchPageHero
      .querySelector('a.stream.twitch')
      ?.firstChild
      ._rawText
      .trim(),

    bestOf: (matchPageHero) =>
      isMatchLive
        ? undefined
        : matchPageHero
          .querySelector('div.best-of')
          .textContent
          .match(/(Best of [1-9]) match/)[1],

    teams: (matchPageHero) =>
      isMatchLive
        ? matchPageHero
          .querySelectorAll('div.match.live.row > div.large-7.columns > div.row > div.team.columns > div.row')
        : matchPageHero
          .querySelectorAll('div.cell.match > div.grid-x > div.team.cell'),

    teamParser: {
      fullTitle: (teamCell) =>
        isMatchLive
          ? teamCell
            .querySelector('a.name')
            .textContent
          : teamCell
            .querySelector('h2 > a')
            .textContent,

      teamLink: (teamCell) =>
        isMatchLive
          ? CONFIG.gosuApi.gosuDota2Url.concat(teamCell
            .querySelector('a.name')
            .rawAttrs
            .match(/href\s*=\s*"(.+?)"/)[1])
          : CONFIG.gosuApi.gosuDota2Url.concat(teamCell
            .querySelector('h2 > a')
            .rawAttrs
            .match(/href\s*=\s*"(.+?)"/)[1]),

      logoUrl: (teamCell) => {
        const gosuTeamLogo = teamCell
          .querySelector('div.avatar')
          .rawAttrs
          .match(/style="background-image:url\('(.+?)\?.*'\);"/)[1]  // remove the '?w=100' parameter from the end
        return gosuTeamLogo === 'https://static.gosugamers.net/07/d9/d0/b63edb6b283f2c450e1fb650255dd2ff06d7bd856b2c89d08c102b668d.jpg'
          ? 'default'
          : gosuTeamLogo
      }
    },
  }
}

export default gosuMatchPageParser