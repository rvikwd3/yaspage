const suggestionDefaults = [
  /*
  * Default search suggestions for the specified queries
  */
  {
    key: ['lq', 'liquipedia'],
    suggestions: [
      {
        name: '!lq upcoming',
        url: 'https://liquipedia.net/dota2/Liquipedia:Upcoming_and_ongoing_matches'
      }
    ]
  },
  {
    key: ['t', 'twitch'],
    suggestions: [
      {
        name: '!t following',
        url: 'https://www.twitch.tv/directory/following'
      }
    ]
  },
  {
    key: ['tw', 'twitter'],
    suggestions: [
      {
        name: '!tw home',
        url: 'https://twitter.com/home'
      },
      {
        name: '!tw profile',
        url: 'https://twitter.com/rvikwd7'
      }
    ]
  },
  {
    key: ['r', 'reddit'],
    suggestions: [
      {
        name: '!r dota2',
        url: 'https://old.reddit.com/r/dota2'
      },
      {
        name: '!r learndota2',
        url: 'https://old.reddit.com/r/learndota2'
      }
    ]
  },
]

export default suggestionDefaults