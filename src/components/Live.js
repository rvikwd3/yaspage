import styled, { keyframes } from 'styled-components'

const growOut = keyframes`
  from  {
    opacity: 1;
    scale: 0.95;
  }

  to {
    opacity: 0;
    scale: 2;
  }
`

const pulse = keyframes`
  0% {
    scale: 0.90;
  }

  70% {
    scale: 1;
  }

  100% {
    scale: 0.90;
  }
`

const RedPulse = styled.div`
  background: rgba(255, 82, 82, 1);
  border-radius: 50%;
  height: 20px;
  width: 20px;
  transform: scale(1);
  box-shadow: 0px 0px 8px rgba(0,0,0,0.1);

  animation: ${pulse} 1.8s infinite;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 1;
    transform: scale(0.90);
    background: rgba(255, 82, 82, 1);

    animation: ${growOut} 1.8s infinite;
  }
`

const Live = () => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    gap: '9px',
    alignItems: 'center',
  }
  return (
    <div style={style}>
      <RedPulse />
      <span>Live</span>
    </div>
  )
}

export default Live