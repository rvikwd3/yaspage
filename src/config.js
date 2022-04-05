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
  * Constants related to liquipedia API
  */
  liquipediaApi: {
    upcomingMatchesLimit: 3,  // number of upcoming matches to show in the Upcoming Matches Panel
    upcomingMatchesApiUrl: 'https://liquipedia.net/dota2/api.php?action=parse&format=json&formatversion=2&pageid=25928',
    upcomingMatchesPageUrl: 'https://liquipedia.net/dota2/Liquipedia:Upcoming_and_ongoing_matches',
    defaultMatches: [
      {
        matchLeague: {
          abbreviatedTitle: 'DPC SEA T2: Div. I',
          iconUrl: '/commons/images/thumb/2/2f/DPC_SEA_2021-2022_Tour_2_icon_allmode.png/49px-DPC_SEA_2021-2022_Tour_2_icon_allmode.png',
          pageUrl: '/dota2/Dota_Pro_Circuit/2021-22/2/Southeast_Asia/Division_I'
        },
        matchTwitchUser: 'Beyond_the_Summit',
        matchTimestamp: '1648883400',
        matchLength: { text: 'Best-of-three', abbreviated: 'Bo3' },
        teamLeft: {
          title: 'Team SMG',
          abbreviatedTitle: 'SMG',
          pageUrl: '/dota2/Team_SMG',
          imgSrc: '/commons/images/thumb/9/91/Team_SMG_2022_allmode.png/66px-Team_SMG_2022_allmode.png'
        },
        teamRight: {
          title: 'Neon Esports',
          abbreviatedTitle: 'Neon',
          pageUrl: '/dota2/Neon_Esports',
          imgSrc: '/commons/images/thumb/4/45/Neon_Esports_allmode.png/50px-Neon_Esports_allmode.png'
        }
      },
      {
        matchLeague: {
          abbreviatedTitle: 'DPC SEA T2: Div. I',
          iconUrl: '/commons/images/thumb/2/2f/DPC_SEA_2021-2022_Tour_2_icon_allmode.png/49px-DPC_SEA_2021-2022_Tour_2_icon_allmode.png',
          pageUrl: '/dota2/Dota_Pro_Circuit/2021-22/2/Southeast_Asia/Division_I'
        },
        matchTwitchUser: 'Beyond_the_Summit',
        matchTimestamp: '1648893600',
        matchLength: { text: 'Best-of-three', abbreviated: 'Bo3' },
        teamLeft: {
          title: 'Fnatic',
          abbreviatedTitle: 'Fnatic',
          pageUrl: '/dota2/Fnatic',
          imgSrc: '/commons/images/thumb/f/f9/Fnatic_2020_allmode.png/77px-Fnatic_2020_allmode.png'
        },
        teamRight: {
          title: 'Nigma Galaxy SEA',
          abbreviatedTitle: 'NGX.SEA',
          pageUrl: '/dota2/Nigma_Galaxy_SEA',
          imgSrc: '/commons/images/thumb/5/56/Nigma_Galaxy_darkmode.png/50px-Nigma_Galaxy_darkmode.png'
        }
      }
    ]
  },

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