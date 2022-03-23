import { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'

import useKeydownCatcher from '../hooks/useKeydownCatcher'

import interfaceKeyEventHandler from '../utils/interfaceKeyEventHandler'

import PrimaryInput_Styled from './PrimaryInput'
import StyledSuggestionContainer from './StyledSuggestionContainer'

const InterfaceContainer_Styled = styled.div`
  // grid with two rows: input and suggestions
  display: grid;
  grid-template-rows: 200px 1fr;
  align-items: center;

  // center position
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
`

/*
*   TODO:
*   When interfaceInput is '' and Backspace is pressed
*   -> switch visibleContainer to 'LandingContainer'
*/
const InterfaceContainer = ({ setPageToShow, interfaceInput, setInterfaceInput }) => {
  const keydownEvent = useKeydownCatcher()
  const [primaryTextColor, setPrimaryTextColor] = useState('white')

  useEffect(() => {
    if (keydownEvent) {
      const actionOnKeydown = interfaceKeyEventHandler(keydownEvent, interfaceInput, setInterfaceInput, setPageToShow)
      if (actionOnKeydown) {
        actionOnKeydown()
      }
    }
  }, [keydownEvent])

  return (
    <InterfaceContainer_Styled>
      <PrimaryInput_Styled
        value={interfaceInput}
        textColor={primaryTextColor}
      />
      <StyledSuggestionContainer
        primaryInput={interfaceInput}
        setPrimaryTextColor={setPrimaryTextColor}
      />
    </InterfaceContainer_Styled>
  )
}

export default InterfaceContainer