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

/*
* <img> tag for background
*/
const BackgroundImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;

  object-fit: cover;
  opacity: ${backgroundConfig.opacity};

  visibility: ${ props => props.isImgLoaded ? 'visible' : 'hidden' };

  /* Animation time should be same as visibility transition time */
  animation: ${ props => props.isImgLoaded ? fadeIn : fadeOut } ${backgroundConfig.animationDuration} ${backgroundConfig.animationCurve};
  transition: visibility ${backgroundConfig.animationDuration} ${backgroundConfig.animationCurve};
`
const BackgroundDiv = styled.div`
  display: inline-block;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  transition: opacity .5s linear;

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
      {/* <BackgroundImg
        src={url}
        isImgLoaded={isImgLoaded}
        onLoad={() => setIsImgLoaded(true)}
      /> */}
    </BackgroundDiv>
  )
}

export default Background