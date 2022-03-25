import styled, { css } from 'styled-components'
import StyledIcon from './Icon'

const Suggestion = ({ content, iconUrl, hex, url, className }) => {
  return (
    <a href={url} className={className}>
        { iconUrl && <StyledIcon src={iconUrl} /> }
        <p>{content}</p>
    </a>
  )
}

const StyledSuggestion = styled(Suggestion)`
  width: 80%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;

  border-radius: 50px;
  text-decoration: none;

  background-color: ${props => props.highlight ? 'rgba(0,0,0,0.37)' : 'rgba(0,0,0,0.17)'};
  box-shadow: 1px 4px 10px rgba(0,0,0,0.2);

  // default suggestion text style
  color: white;
  font-size: clamp(15px, 3vw, 23px);
  font-weight: 500;

  // on hover glow hex primary
  transition: 0.3s ease-out;
  ${props => props.hex && css`
    &:hover {
      text-shadow: 1px 2px 9px ${props.hex.primary};
      color: ${props.hex.secondary};
    }
  `}

`

export default StyledSuggestion