import styled from 'styled-components'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import Match from './Match'
import Spinner from '../Spinner'
import useGosuUpcomingMatches from '../../../hooks/useGosuUpcomingMatches'
import MinimizeToggle_Styled from './MinimizeToggle'


const MatchesContainer = styled.div`
  display: grid;
  grid-template-columns: auto 55px 2.6em 55px 0.6fr auto;
  grid-row-gap: 40px;
  align-items: center;

  width: 100%;
  padding-bottom: 30px;

  font-size: 1.32em;
  font-weight: 500;
  color: white;
  text-shadow: 1px 4px 8px rgba(0,0,0,0.25);

`

const PanelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  row-gap: 23px;

  padding: 1rem 5px 0;
  z-index: 2;
`


const UpcomingMatchesContainer = ({ togglePanelMinimize }) => {
  // get matches from API
  // (spinner while matches are loading)
  // map matches inside matches container
  const { loading: loading, upcomingMatchesJSON: data } = useGosuUpcomingMatches()

  return (
    <div id="upcoming-matches-container">
      <PanelContainer>
        <MinimizeToggle_Styled onClick={togglePanelMinimize} />
        <Scrollbars
          style={{ width: '100%', height: '100%', maxHeight: 'inherit' }}
          renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
          hideTracksWhenNotNeeded
          autoHide
        >
          {loading
            && <Spinner />
          }
          {!loading
            && <MatchesContainer>
              {data.map(match =>
                <Match
                  key={`${match.teamLeft.abbreviatedTitle}_${match.teamRight.abbreviatedTitle}`}
                  match={match}
                />
              )}
            </MatchesContainer>
          }
        </Scrollbars>
      </PanelContainer>
    </div>
  )
}

export default UpcomingMatchesContainer