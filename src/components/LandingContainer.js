import styled from 'styled-components'

import Clock_Styled from './Clock'
import Date_Styled from './FormattedDate'

const HorizontalRule_Styled = styled.hr`
  grid-row: 2;

  color: white;
  width: 100%;
  border: 2px solid #fff;
  box-shadow: 2px 4px 10px rgba(20, 20, 20, 0.3);
`

const DateTime_Grid = styled.div`
  display: grid;
  grid-template-rows: 150px 0.4fr 1fr;
  align-items: center;
  justify-items: center;

  position: fixed;
  top: 26%;
  left: 50%;
  transform: translate(-50%);

  // Fade in Date Time Grid
  animation: fadein 0.3s linear;

  @keyframes fadein {
    from {opacity: 0.5;}
    to {opacity: 1;}
  }
`

const LandingContainer = () => {

  return (
    <DateTime_Grid>
      <Clock_Styled />
      <HorizontalRule_Styled/>
      <Date_Styled />
    </DateTime_Grid>
  )
}

export default LandingContainer