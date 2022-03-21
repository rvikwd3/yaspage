import React from 'react'

import LandingContainer from './components/LandingContainer'
import GlobalStyle from './globalStyles'
import BackgroundContainer from './components/BackgroundContainer'


const App = () => {

  return (
    <div>
      <GlobalStyle/>
      <BackgroundContainer/>
      <LandingContainer />
    </div>
  )
}

export default App