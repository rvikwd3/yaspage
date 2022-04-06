const CONFIG = {

  /*
  * Choose a predefined theme:
  * - 'unsplash'
  * - 'gradient-light'
  * - 'gradient-dark'
  * - 'dark'
  */
  // theme: 'unsplash',

  /*
  * Open triggered queries in a new tab
  */
  // queryNewTab: false,

  /*
  * The delimiter between a command key and your search query. For example,
  * to search GitHub for tilde, you'd type "!gh tilde".
  */
  // querySearchDelimiter: ' ',

  /*
  * Constants related to GosuGamers Parser API
  */
  gosuApi: {
    upcomingMatchesLimit: 7,
    upcomingMatchesListUrl: 'https://www.gosugamers.net/dota2/matches',
    gosuDota2Url: 'https://www.gosugamers.net',
  },

  /*
  * How many minutes should pass before refresh upcomingMatches data
  */
  upcomingMatchesMinutesTillLocalDataStale: 5,

  /*
  * CORS Proxy server URL
  */
  corsAnywhere: 'https://murmuring-castle-62457.herokuapp.com/',

  /*
  *
  */
  streamTable: {
    'DreamLeague EN': 'https://www.twitch.tv/dreamleague',
    'winline_d2cl': 'https://www.twitch.tv/winline_d2cl',
    'ESL_DOTA2': 'https://www.twitch.tv/esl_dota2',
    'yuHengTV': 'https://www.twitch.tv/yuHengTV',
    'BTS TV': 'https://www.twitch.tv/beyondthesummit',
    'PWRDEsports1': 'https://www.twitch.tv/pwrdesports1',
  },

  /*
  * Max number of suggestions that will be shown
  */
  suggestionLimit: 6,

  /*
  * Default Unsplash URL in case of no localStorage
  */
  defaultHighResBackgroundUrl: 'https://images.unsplash.com/photo-1648138754721-10ce6a0224a3?auto=format&fit=crop&w=1920&q=80',
  defaultLowResBackgroundUrl: 'https://images.unsplash.com/photo-1648138754721-10ce6a0224a3?auto=format&fit=crop&w=600&q=80',
}

export default CONFIG