import React, { useState } from 'react'

import GlobalStyle from './globalStyles'
import BackgroundContainer from './components/BackgroundContainer'
import Page from './components/Page'

const App = () => {
  const [backgroundUrl, setBackgroundUrl] = useState('')

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer
        setBackgroundUrl={setBackgroundUrl}
      />
      <Page
        backgroundUrl={backgroundUrl}
      />
    </>
  )
}

export default App