import { useState } from 'react'

import InterfaceContainer from './InterfaceContainer'
import LandingContainer from './LandingContainer'

/*
*   On non-control keydown:
*     Hide Landing Container
*     Show Interface Container
*     Add key to primaryInput
*   When InterfaceContainer signals showLanding, show LandingContainer
*/
const Page = () => {
  const [pageToShow, setPageToShow] = useState('LANDING')
  const [initialInput, setInitialInput] = useState('')
  return (
    <div>
      {pageToShow === 'LANDING'
        && (<LandingContainer
          pageToShow={pageToShow}
          setPageToShow={setPageToShow}
          setInitialInput={setInitialInput}
        />)
      }
      {pageToShow === 'INTERFACE'
        && (<InterfaceContainer
          setPageToShow={setPageToShow}
          initialInput={initialInput}
        />
        )
      }
    </div >
  )
}

export default Page