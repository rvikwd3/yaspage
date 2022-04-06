import { useState } from 'react'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import UpcomingMatchesPanel_Styled from './UpcomingMatchesPanel'

const MinimizedButton = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 4em;
  height: 4em;

  margin-right: 4em;
  margin-bottom: 2em;

  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);

  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.3));

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: transform 0.2s cubic-bezier(0.11, 0, 0.5, 0);

  &:hover {
    transform: translateY(-7px);
    transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  }

`

const getLocalMinimizeStatus = (localUpcomingMatchesPanel) => {
  // eslint-disable-next-line no-unused-vars
  const { minimizedStatus, ...rest } = JSON.parse(localUpcomingMatchesPanel)
  return minimizedStatus
}

const TogglablePanel = ({ backgroundUrl }) => {
  const [minimized, setMinimized] = useState(() => {
    const localUpcomingMatchesPanel = window.localStorage.getItem('upcomingMatchesPanel')
    if(!localUpcomingMatchesPanel)
      return true
    return getLocalMinimizeStatus(localUpcomingMatchesPanel)
  })

  const togglePanelMinimize = () => {
    const toggledStatus = !minimized
    setMinimized(toggledStatus)
    window.localStorage.setItem('upcomingMatchesPanel', JSON.stringify({
      minimizedStatus: toggledStatus
    }))
  }

  return (
    <TransitionGroup className="pageTransitionGroup">
      <CSSTransition
        key={minimized}
        timeout={230}
        appear={true}
        classNames="minimize"
        unmountOnExit
      >
        {() => {
          return minimized
            ? <MinimizedButton
              id="minimize-button"
              onClick={togglePanelMinimize}
            >
              <img
                src={require('../assets/icons/dota.png')}
                style={{
                  objectFit: 'cover',
                  width: '60%',
                }}
              />
            </MinimizedButton>
            : <UpcomingMatchesPanel_Styled
              togglePanelMinimize={togglePanelMinimize}
              backgroundUrl={backgroundUrl}
            />
        }}
      </CSSTransition>
    </TransitionGroup>
  )
}

export default TogglablePanel