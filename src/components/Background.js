import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import ProgressiveImageFC from '../utils/ProgressiveImageFC'

const backgroundConfig = {
  opacity: 0.88,
  animationCurve: 'linear',
  animationDuration: '0.4s',
}

/*
* Animation keyframes
*/
const fadeIn = keyframes`
  from { opacity: 0; } to { opacity: ${backgroundConfig.opacity}; }
`

const fadeOut = keyframes`
  from { opacity: ${backgroundConfig.opacity}; } to { opacity: 0; }
`

const BackgroundDiv = styled.div`
  display: inline-block;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0.85;

  object-fit: cover;

  z-index: -1;
`

/*
* on <img onLoad> load set state to true
* on true state, visibility transitions to visible
*/
const Background = ({ highResUrl, lowResUrl }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false)

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