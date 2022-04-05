import styled from 'styled-components'
import UpcomingMatchesContainer from './UpcomingMatchesContainer'

const BlurBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);

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
  box-shadow: inset 0 0 1800px rgba(200, 200, 200, 0.5);
  filter: blur(10px);
  margin: -20px;
  z-index: -1;
}
`

const RisingHeader = styled.h2`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;

  font-size: 1.4em;
  font-weight: 500;
  text-align: center;
  color: white;
  text-shadow: 1px 4px 10px rgba(0,0,0,0.65);

  opacity: 0;

  transition: top 0.4s cubic-bezier(0.32, 0, 0.67, 0), opacity 0.4s cubic-bezier(0.83, 0, 0.17, 1);
`

const UpcomingMatchesPanel = ({ className, backgroundUrl }) => {

  return (
    <div className={className} id="panel-area" >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ overflow: 'hidden', width: '100%', height: '100%', borderRadius: '20px', }}>
          <UpcomingMatchesContainer/>
          <BlurBackground backgroundUrl={backgroundUrl} />
          <RisingHeader id="upcoming-matches-header">Upcoming Matches</RisingHeader>
        </div>
      </div>
    </div>
  )
}

const UpcomingMatchesPanel_Styled = styled(UpcomingMatchesPanel)`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 4em;
  margin-bottom: 2em;
  width: 35em;
  height: 19em;
  box-shadow: 0 0 1.2rem rgba(0,0,0,0.18);
  border-radius: 20px;
`


export default UpcomingMatchesPanel_Styled