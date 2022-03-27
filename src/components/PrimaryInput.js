import styled from 'styled-components'
import { motion } from 'framer-motion'

const highlightOnEmptyVariant = {
  initial: {
    backgroundColor: 'rgba(41, 41, 41, 0)',
  },
  animate: {
    backgroundColor: 'rgba(41, 41, 41, 0.2)',
    transition: {
      delay: 0.8,
      duration: 0.2,
    }
  }
}

const PrimaryInput = ({ className, textColor, value }) => {

  return (
    <motion.span className={className}
      variants={highlightOnEmptyVariant}
      initial="initial"
      animate={value ? "initial" : "animate"}
    >
      {value}
    </motion.span>
  )
}

const PrimaryInput_Styled = styled(PrimaryInput)`
  width: 100%;
  min-height: 100px;
  text-align: center;

  white-space: pre;

  // grid item
  grid-row: 1;

  // font
  font-weight: 700;
  font-size: clamp(60px, 4vw, 80px); // scale font size with width
  color: ${props => props.textColor};

  text-shadow: 2px 5px 10px rgba(0,0,0,0.5);
`

export default PrimaryInput_Styled