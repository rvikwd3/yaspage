import styled from 'styled-components'

const UpcomingMatchesPanel = ({ className, backgroundUrl }) => {

  console.log(`URL passed in: ${backgroundUrl}`)

  return (
    <div className={className}>
      <div style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', color: 'white', }}>MATCHES</div>
    </div>
  )
}

const UpcomingMatchesPanel_Styled = styled(UpcomingMatchesPanel)`
  & {
    width: 18rem;
    height: 28rem;

    position: fixed;
    bottom: 0;
    right: 0;

    margin-right: 4rem;
    margin-bottom: 2rem;

    border-radius: 15px;
    z-index: 1;
    overflow: hidden;

    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    background-image: ${props => `url(${props.backgroundUrl})`};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: top;

    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.55);

    filter: blur(5px);
    margin: -20px;
  }
`

export default UpcomingMatchesPanel_Styled