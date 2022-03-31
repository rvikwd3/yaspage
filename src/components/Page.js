import { useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'

import InterfaceContainer from './InterfaceContainer'
import LandingContainer from './LandingContainer'

/*
*   On non-control keydown:
*     Hide Landing Container
*     Show Interface Container
*     Add key to interface input
*   When InterfaceContainer signals showLanding, show LandingContainer
*/
const Page = () => {
  const [pageToShow, setPageToShow] = useState('LANDING')
  const [initialInput, setInitialInput] = useState('')
  return (
    <TransitionGroup className="pageTransitionGroup">
      <CSSTransition
        key={pageToShow}
        timeout={230}
        appear={true}
        classNames="containerFade"
        unmountOnExit
      >
        {() => {
          switch (pageToShow) {
          case 'LANDING':
            return <LandingContainer
              setPageToShow={setPageToShow}
              setInitialInput={setInitialInput}
            />
          case 'INTERFACE':
            return <InterfaceContainer
              setPageToShow={setPageToShow}
              initialInput={initialInput}
            />
          }
        }}
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Page