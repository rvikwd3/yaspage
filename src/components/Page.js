import { useState, useEffect } from "react"

import interfaceKeyEventHandler from "../utils/interfaceKeyEventHandler"

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

  // get interface container
  const getInterfacePage = (props) => {
    return <InterfaceContainer
      {...props}
    />
  }

  // setPage and get interface container preset with initial input
  // const switchToInterfacePage = (initialInput) => {
  //   setPageToShow('INTERFACE')
  //   setInterfaceInput(initialInput)
  // }

  // get landing container
  const getLandingPage = (props) => {
    return <LandingContainer
      {...props}
    />
  }

  return (
    <div>
      {pageToShow === 'LANDING' && getLandingPage({setPageToShow, setInterfaceInput})}
      {pageToShow === 'INTERFACE' && getInterfacePage({setPageToShow, interfaceInput, setInterfaceInput})}
    </div>
  )
}

export default Page