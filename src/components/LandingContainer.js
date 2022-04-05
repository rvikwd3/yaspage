import { useEffect } from 'react'
import styled from 'styled-components'

import useKeydownCatcher from '../hooks/useKeydownCatcher'
import { isControlKey } from '../utils/isControlKey'
import Clock_Styled from './Clock'
import Date_Styled from './FormattedDate'
import UpcomingMatchesPanel_Styled from './UpcomingMatchesPanel'

const HorizontalRule_Styled = styled.hr`
  grid-row: 2;

  color: white;
  width: 100%;
  border: 2px solid #fff;
  box-shadow: 2px 4px 10px rgba(20, 20, 20, 0.3);
`

const LandingContainer_Styled = styled.div`
  display: grid;
  grid-template-rows: 150px 0.4fr 1fr;
  align-items: center;
  justify-items: center;

  position: fixed;
  top: 26%;
  left: 50%;
  transform: translate(-50%);
`

const LandingContainer = ({ setPageToShow, setInitialInput, backgroundUrl }) => {
  // Keydown -> setKeydownEvent effect
  const keydownEvent = useKeydownCatcher()

  /*
  *   If lastkeypress isn't empty, and
  *   if lastkeypress is non-control,
  *   -> switch to 'InterfaceContainer'
  */
  useEffect(() => {
    if (keydownEvent && !isControlKey(keydownEvent.key)) {
      setInitialInput(keydownEvent.key) // set initialInput as key
      setPageToShow('INTERFACE')  // switch to interface page
    }
  }, [keydownEvent, setPageToShow, setInitialInput])

  return (
    <div style={{ position: 'relative', }}>
      <LandingContainer_Styled>
        <Clock_Styled />
        <HorizontalRule_Styled />
        <Date_Styled />
      </LandingContainer_Styled>
      <UpcomingMatchesPanel_Styled
        backgroundUrl={backgroundUrl}
      />
    </div>
  )
}

export default LandingContainer