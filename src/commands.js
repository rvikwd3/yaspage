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
      key: ['t', 'twitch'],
      name: 'twitch',
      url: 'https://www.twitch.tv/directory/following',
      iconUrl: 'icons/twitch.png',
      hex: { primary: '#805fbf', secondary: '#e6ddf0' }
    },
    {
      key: ['tw', 'twitter'],
      name: 'twitter',
      url: 'https://www.twitter.com/',
      iconUrl: 'icons/twitter.png',
      hex: { primary: '#5fbee7', secondary: '#e3f0fa' }
    },
    {
      key: ['lq', 'liquipedia'],
      name: 'liquipedia',
      url: 'https://liquipedia.net/dota2/Main_Page',
      iconUrl: 'icons/liquipedia.png',
      hex: { primary: '#074e88', secondary: '#fbdfdf' }
    },
    {
      key: ['f', 'figma'],
      name: 'figma',
      url: 'https://www.figma.com/',
      iconUrl: 'icons/figma.png',
      hex: { primary: '#c7b9ff', secondary: '#ffffff' }
    },
    {
      key: ['r', 'reddit'],
      name: 'reddit',
      url: 'https://old.reddit.com/',
      iconUrl: 'icons/reddit.png',
      hex: { primary: '#ff4500', secondary: '#ffffff' }
    },
    {
      key: ['ld2l'],
      name: 'LD2L',
      url: 'https://ld2l.gg/',
      iconUrl: 'icons/ld2l.png',
      hex: { primary: '#fa6b6b', secondary: '#ffffff' }
    },
    {
      key: ['rd2l'],
      name: 'RD2L',
      url: 'https://rd2l.gg/divisions',
      iconUrl: 'icons/rd2l.png',
      hex: { primary: '#fa6b6b', secondary: '#ffffff' }
    },
    {
      key: ['fhdl', 'fluffy'],
      name: 'fhdl',
      url: 'http://www.fhdl.org/',
      iconUrl: 'icons/fhdl.webp',
      hex: { primary: '#fa6b6b', secondary: '#ffffff' }
    },
    {
      key: ['db', 'dotabuff'],
      name: 'dotabuff',
      url: 'https://www.dotabuff.com/',
      iconUrl: 'icons/dotabuff.png',
      hex: { primary: '#ed3b1c', secondary: '#f4fff9' }
    },
    {
      key: ['s', 'spotify'],
      name: 'spotify',
      url: 'https://open.spotify.com/',
      iconUrl: 'icons/spotify.png',
      hex: { primary: '#1ed760', secondary: '#ffffff' }
    },
    {
      key: ['y', 'yt', 'youtube'],
      name: 'youtube',
      url: 'https://www.youtube.com/',
      iconUrl: 'icons/youtube.png',
      hex: { primary: '#ea4641', secondary: '#ffffff' }
    },
    {
      key: ['c', 'gc', 'calendar'],
      name: 'google calendar',
      url: 'https://calendar.google.com/calendar/u/0/r',
      iconUrl: 'icons/google_calendar.png',
      hex: { primary: '#1a73e8', secondary: '#ffffff' }
    },
    {
      key: ['i', 'ig', 'insta', 'instagram'],
      name: 'instagram',
      url: 'https://www.instagram.com/',
      iconUrl: 'icons/instagram.png',
      hex: { primary: '#fbad50', secondary: '#fccc63' }
    },
    {
      key: ['gh', 'git', 'github'],
      name: 'github',
      url: 'https://github.com/',
      iconUrl: 'icons/github.png',
      hex: { primary: '#666', secondary: '#f5f5f5' }
    },
    {
      key: ['l', 'li', 'linkedin'],
      name: 'linkedin',
      url: 'https://www.linkedin.com/',
      iconUrl: 'icons/linkedin.png',
      hex: { primary: '#0077b5', secondary: '#fcfcfc' }
    },
    {
      key: ['m', 'mail', 'gmail'],
      name: 'gmail',
      url: 'https://mail.google.com/mail/u/0/',
      iconUrl: 'icons/gmail.png',
      hex: { primary: '#EA4335', secondary: '#f4f4f4' }
    },
    {
      key: ['d', 'gd', 'drive'],
      name: 'google drive',
      url: 'https://drive.google.com/drive/u/0/my-drive',
      iconUrl: 'icons/google_drive.png',
      hex: { primary: '#0F9D58', secondary: '#f4f4f4' }
    },
    {
      key: ['k', 'gk', 'keep'],
      name: 'google keep',
      url: 'https://keep.google.com/u/0/',
      iconUrl: 'icons/google_keep.png',
      hex: { primary: '#f2b100', secondary: '#ffffff' }
    },
    {
      key: ['u', 'unsplash'],
      name: 'unsplash',
      url: 'https://unsplash.com/',
      iconUrl: 'icons/unsplash.png',
      hex: { primary: '#eeeeee', secondary: '#ffffff' }
    },
    {
      key: ['n', 'notion'],
      name: 'notion',
      url: 'https://notion.so',
      iconUrl: 'icons/notion.png',
      hex: { primary: '#eeeeee', secondary: '#ffffff' }
    },
  ]

export default commands