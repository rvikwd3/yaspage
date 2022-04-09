import styled from 'styled-components'
import { motion } from 'framer-motion'

import commands from '../../commands'

const highlightOnEmptyVariant = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.02,
    }
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.2,
    }
  }
}

/* Styled component requires the textColor prop, eslint throws error on it not being used in functional component */
// eslint-disable-next-line no-unused-vars
const PrimaryInput = ({ className, interfaceInput }) => {

  return (
    <motion.div
      className={className}
    >
      <span
        style={{
          position: 'absolute',
          zIndex: 2,
          whiteSpace: 'pre',
        }}
      >
        {interfaceInput}
      </span>
      <motion.span
        style={{
          position: 'absolute',
          color: 'white',
          zIndex: 1,
        }}
        variants={highlightOnEmptyVariant}
        initial="initial"
        animate={interfaceInput ? 'initial' : 'animate'}
        // animate="animate"
      >↪</motion.span>
    </motion.div >
  )
}

const commandTextColor = (input) => {
  // if a matchingCommand exists, set primary input text to its hex color
  const matchingCommand = commands.find(command => command.key.includes(input))
  return matchingCommand
    ? matchingCommand.hex.primary
    : 'white'
}

const PrimaryInput_Styled = styled(PrimaryInput)`
  width: 100%;
  min-height: 110px;
  text-align: center;

  // grid item
  grid-row: 1;

  // both input and hover box should be centered
  display: flex;
  justify-content: center;
  align-items: center;

  // font
  font-weight: 700;
  font-size: clamp(60px, 4vw, 80px); // scale font size with width
  color: ${props => commandTextColor(props.interfaceInput)};

  text-shadow: 2px 5px 10px rgba(0,0,0,0.5);
`

export default PrimaryInput_Styled