import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

import interfaceKeyEventHandler from "../utils/interfaceKeyEventHandler"

import InterfaceContainer from "./InterfaceContainer"
import LandingContainer from "./LandingContainer"

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }
}

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
        && (<motion.div
          key="LandingContainerKey"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <LandingContainer
            setPageToShow={setPageToShow}
            setInterfaceInput={setInterfaceInput}
          />
        </motion.div>
        )}
      {pageToShow === 'INTERFACE'
        && (<motion.div
          key="InterfaceContainerKey"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <InterfaceContainer
            setPageToShow={setPageToShow}
            interfaceInput={interfaceInput}
            setInterfaceInput={setInterfaceInput}
          />
        </motion.div>
        )}
    </div >
  )
}

export default Page