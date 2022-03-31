import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import useKeydownCatcher from '../hooks/useKeydownCatcher'

import interfaceKeyEventHandler from '../utils/interfaceKeyEventHandler'

import PrimaryInput_Styled from './PrimaryInput'
import SuggestionContainer_Styled from './SuggestionContainer_Styled'
import { SwitchTransition } from 'react-transition-group'

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
      const actionOnKeydown = interfaceKeyEventHandler(
        keydownEvent,
        interfaceInput,
        setInterfaceInput,
        setPageToShow
      )
      if (actionOnKeydown) {
        actionOnKeydown()
      }
    }
  }, [keydownEvent]) // adding interfaceInput as dependency goes into infinite loop of adding key

  return (
    <InterfaceContainer_Styled>
      <PrimaryInput_Styled
        interfaceInput={interfaceInput}
      />
      <SwitchTransition>
        <CSSTransition
          key={interfaceInput}
          classNames="fade"
          timeout={280}
          appear={true}
          unmountOnExit
        >
          {() => <SuggestionContainer_Styled
            key={interfaceInput}
            interfaceInput={interfaceInput}
            keydownEvent={keydownEvent}
          />}
        </CSSTransition>
      </SwitchTransition>
    </InterfaceContainer_Styled>
  )
}

export default InterfaceContainer