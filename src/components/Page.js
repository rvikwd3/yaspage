import { useState } from "react"

import InterfaceContainer from "./InterfaceContainer"
import LandingContainer from "./LandingContainer"

/*
*   On non-control keydown:
*     Hide Landing Container
*     Show Interface Container
*     Add key to primaryInput
*   When InterfaceContainer signals showLanding, show LandingContainer
*/
const Page = () => {
  const [pageToShow, setPageToShow] = useState('LANDING')
  const [interfaceInput, setInterfaceInput] = useState('')

  return (
    <div>
      {pageToShow === 'LANDING'
        && <LandingContainer
          setPageToShow={setPageToShow}
          setInterfaceInput={setInterfaceInput}
        />
      }
      {pageToShow === 'INTERFACE'
        && (<InterfaceContainer
          setPageToShow={setPageToShow}
          interfaceInput={interfaceInput}
          setInterfaceInput={setInterfaceInput}
        />
        )}
    </div >
  )
}

export default Page