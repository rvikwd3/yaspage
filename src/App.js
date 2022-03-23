import React from 'react'

import GlobalStyle from './globalStyles'
import BackgroundContainer from './components/BackgroundContainer'
import Page from './components/Page'

const App = () => {

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer />
      <Page />
    </>
  )
}

export default App