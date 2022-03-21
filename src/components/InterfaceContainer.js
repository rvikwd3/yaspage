import { useState } from 'react'
import styled from 'styled-components'

import PrimaryInput from './PrimaryInput'
import StyledSuggestionContainer from './StyledSuggestionContainer'

const StyledInterfaceContainer = styled.div`
  // grid with two rows: input and suggestions
  display: grid;
  grid-template-rows: 200px 1fr;

  // center position
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
`

const Interface = () => {
  const [interfaceInput, setInterfaceInput] = useState('Type here')
  const [primaryTextColor, setPrimaryTextColor] = useState('white')
  // TODO: when interfaceInput is '' return to clock/date page

  return (
    <>
      <PrimaryInput
        onChange={({ target }) => setInterfaceInput(target.value)}
        value={interfaceInput}
        textColor={primaryTextColor}
        autoFocus
      />
      <StyledSuggestionContainer
        primaryInput={interfaceInput}
        setPrimaryTextColor={setPrimaryTextColor}
      />
    </>
  )
}

const InterfaceContainer = () => {
  return (
    <StyledInterfaceContainer>
      <Interface />
    </StyledInterfaceContainer>
  )
}

export default InterfaceContainer