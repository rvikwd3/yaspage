import { useState, useEffect } from 'react'
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

const InterfaceContainer = ({ setPageToShow, initialInput }) => {
  const keydownEvent = useKeydownCatcher()
  const [interfaceInput, setInterfaceInput] = useState(initialInput)

  useEffect(() => {
    if (keydownEvent) {
      const actionOnKeydown = interfaceKeyEventHandler(keydownEvent, interfaceInput, setInterfaceInput, setPageToShow)
      if (actionOnKeydown) {
        actionOnKeydown()
      }
    }
  }, [keydownEvent])

  return (
    <InterfaceContainer_Styled
      key="InterfaceContainer_Styled"
    >
      <PrimaryInput_Styled
        interfaceInput={interfaceInput}
      />
      <StyledSuggestionContainer
        primaryInput={interfaceInput}
      />
    </InterfaceContainer_Styled>
  )
}

export default InterfaceContainer