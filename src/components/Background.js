import styled from 'styled-components'
import ProgressiveImageFC from '../utils/ProgressiveImageFC'

const BackgroundDiv = styled.div`
  display: inline-block;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  opacity: 0.88;

  z-index: -1;
`

const Background = ({ highResUrl, lowResUrl }) => {
  return (
    <BackgroundDiv>
      <ProgressiveImageFC
        src={highResUrl}
        placeholder={lowResUrl}
      />
    </BackgroundDiv>
  )
}

export default Background