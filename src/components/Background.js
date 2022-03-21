import styled from 'styled-components'

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${props => `url(${props.url}) no-repeat center center fixed`};
  background-size: cover;

  // fade-in animation
  animation: fadein 0.3s ease-out;

  @keyframes fadein {
    from {opacity: 0.1;}
    to {opacity: 1;}
  }
`

export default Background