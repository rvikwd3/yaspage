const commands =
  [
    /*
      {
        "key": input on which preset is loaded
        "name": name of preset
        "url": link which preset goes to on enter
        "hues": {'primary hex', 'secondary hex'}
      }
    */
    {
      key: 't',
      name: 'twitch',
      url: 'https://www.twitch.tv/directory/following',
      iconUrl: 'icons/twitch.png',
      hex: { primary: '#6441A5', secondary: '#e6ddf0' }
    },
    {
      key: 'tw',
      name: 'twitter',
      url: 'https://www.twitter.com/',
      iconUrl: 'icons/twitter.png',
      hex: { primary: '#26a7de', secondary: '#e3f0fa' }
    },
    {
      key: 'lq',
      name: 'liquipedia',
      url: 'https://liquipedia.net/dota2/Main_Page',
      iconUrl: 'icons/liquipedia_51x36.png',
      hex: { primary: '#b12a2a', secondary: '#fbdfdf' }
    },
    {
      key: 'f',
      name: 'figma',
      url: 'https://www.figma.com/',
      iconUrl: 'icons/figma.png',
      hex: { primary: '#c7b9ff', secondary: '#ffffff' }
    },
    {
      key: 'r',
      name: 'reddit',
      url: 'https://old.reddit.com/',
      iconUrl: 'icons/reddit.png',
      hex: { primary: '#ff4500', secondary: '#ffffff' }
    },
    {
      key: 'ld2l',
      name: 'LD2L',
      url: 'https://ld2l.gg/',
      iconUrl: 'icons/ld2l.png',
      hex: { primary: '#3B6A8C', secondary: '#ffffff' }
    }

  ]

export default commands