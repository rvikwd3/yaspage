/*
* 'match' is a <table class="wikitable wikitable-striped infobox_matches_content">
* HTML element parsed from the Liquipedia MediaWiki ?action=parse API
* for page https://liquipedia.net/dota2/Liquipedia:Upcoming_and_ongoing_matches
*/

// Table of text/attribute extractors for data we want from the matchTable
const matchParserTable = {
  matchLeague: {
    abbreviatedTitle: (match) => match
      .querySelector('.match-filler')
      .querySelectorAll('div')[0]
      .querySelectorAll('div')[0]
      .querySelectorAll('a')[0]
      .text,
    iconUrl: (match) => match
      .querySelector('.league-icon-small-image')
      .querySelectorAll('a')[0]
      .querySelectorAll('img')[0]
      .rawAttrs
      .match(/src\s*=\s*"(.+?)"/)[1],
    pageUrl: (match) => match
      .querySelector('.match-filler')
      .querySelectorAll('div')[0]
      .querySelectorAll('div')[0]
      .querySelectorAll('a')[0]
      .rawAttrs
      .match(/href\s*=\s*"(.+?)"/)[1],
  },
  matchTwitchUser: (match) => match
    .querySelector('.timer-object')
    .rawAttrs
    .match(/data-stream-twitch\s*=\s*"(.+?)"/)[1],
  matchTimestamp: (match) => match
    .querySelector('.timer-object')
    .rawAttrs
    .match(/data-timestamp\s*=\s*"(.+?)"/)[1],
  matchLength: {
    text: (match) => match
      .querySelector('.versus')
      .querySelector('abbr')
      .rawAttrs
      .match(/title\s*=\s*"(.+?)"/)[1],
    abbreviated: (match) => match
      .querySelector('.versus')
      .querySelector('abbr')
      .innerHTML,
  },
  teamLeft: {
    title: (match) => match
      .querySelector('.team-left')
      .querySelector('.team-template-text')
      .querySelector('a')
      .rawAttrs
      .match(/title\s*=\s*"(.+?)"/)[1],
    abbreviatedTitle: (match) => match
      .querySelector('.team-left')
      .querySelector('.team-template-text')
      .textContent,
    pageUrl: (match) => match
      .querySelector('.team-left')
      .querySelector('.team-template-text')
      .querySelector('a')
      .rawAttrs
      .match(/href\s*=\s*"(.+?)"/)[1],
    imgSrc: (match) => match
      .querySelector('.team-left')
      .querySelectorAll('.team-template-image-icon')[1] // get darkmode image at [1] instead of lightmode image at [0]
      .querySelectorAll('a')[0]
      .querySelectorAll('img')[0]
      .rawAttrs // from image tab get attributes
      .match(/src\s*=\s*"(.+?)"/)[1], // regex match src attribute and capture group
  },
  teamRight: {
    title: (match) => match
      .querySelector('.team-right')
      .querySelector('.team-template-text')
      .querySelector('a')
      .rawAttrs
      .match(/title\s*=\s*"(.+?)"/)[1],
    abbreviatedTitle: (match) => match
      .querySelector('.team-right')
      .querySelector('.team-template-text')
      .textContent,
    pageUrl: (match) => match
      .querySelector('.team-right')
      .querySelector('.team-template-text')
      .querySelector('a')
      .rawAttrs
      .match(/href\s*=\s*"(.+?)"/)[1],
    imgSrc: (match) => match
      .querySelector('.team-right')
      .querySelectorAll('.team-template-image-icon')[1] // get darkmode image at [1] instead of lightmode image at [0]
      .querySelectorAll('a')[0]
      .querySelectorAll('img')[0]
      .rawAttrs // from image tab get attributes
      .match(/src\s*=\s*"(.+?)"/)[1], // regex match src attribute and capture group
  }
}

// Return a 'MatchObject' with data entries filled from the text/attr extractors
const buildLiquipediaMatchObject = (match) => {

  console.log('Match received to build', match.toString())

  return ({
    matchLeague: {
      abbreviatedTitle: matchParserTable.matchLeague.abbreviatedTitle(match),
      iconUrl: matchParserTable.matchLeague.iconUrl(match),
      pageUrl: matchParserTable.matchLeague.pageUrl(match),
    },
    matchTwitchUser: matchParserTable.matchTwitchUser(match),
    matchTimestamp: matchParserTable.matchTimestamp(match),
    matchLength: {
      text: matchParserTable.matchLength.text(match),
      abbreviated: matchParserTable.matchLength.abbreviated(match),
    },
    teamLeft: {
      title: matchParserTable.teamLeft.title(match),
      abbreviatedTitle: matchParserTable.teamLeft.abbreviatedTitle(match),
      pageUrl: matchParserTable.teamLeft.pageUrl(match),
      imgSrc: matchParserTable.teamLeft.imgSrc(match),
    },
    teamRight: {
      title: matchParserTable.teamRight.title(match),
      abbreviatedTitle: matchParserTable.teamRight.abbreviatedTitle(match),
      pageUrl: matchParserTable.teamRight.pageUrl(match),
      imgSrc: matchParserTable.teamRight.imgSrc(match),
    }
  })
}

export default buildLiquipediaMatchObject