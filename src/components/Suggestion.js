import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import StyledIcon from './Icon'

const suggestionVariants = {
  hidden: {
    opacity: 0,
    y: '-8',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08,
      duration: 0.1,
      ease: 'easeOut',
    }
  },
  whileHover: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.1,
    },
    scale: 1.06,
  },
  whileTap: {
    scale: 0.9,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      delay: 0.1,
      duration: 0.1,
      ease: 'easeOut',
    }
  }
}

const Suggestion = ({ className, suggestion }) => {
  return (
    <motion.div
      variants={suggestionVariants}
      key={suggestion.id}
      whileHover="whileHover"
      whileTap="whileTap"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <a href={suggestion.url} className={className}>
        {suggestion.iconUrl && <StyledIcon src={suggestion.iconUrl} />}
        <p>{suggestion.content}</p>
      </a>
    </motion.div>
  )
}

const StyledSuggestion = styled(Suggestion)`
  width: auto;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;

  padding: 2px 20px;
  border-radius: 40px;
  text-decoration: none;
  white-space: nowrap;

  background-color: ${props => props.suggestion.highlight ? 'rgba(0,0,0,0.43)' : 'rgba(0,0,0,0.17)'};
  box-shadow: 1px 4px 10px rgba(0,0,0,0.2);

  // default suggestion text style
  color: white;
  font-size: clamp(15px, 3vw, 23px);
  font-weight: 500;

  // on hover glow hex primary
  transition: 0.3s ease-out;
  ${props => props.suggestion.hex && css`
    &:hover {
      text-shadow: 1px 2px 9px ${props.suggestion.hex.primary};
      color: ${props.suggestion.hex.secondary};
    }
  `}

`

export default StyledSuggestion