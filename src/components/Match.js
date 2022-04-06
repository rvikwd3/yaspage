import styled from 'styled-components'
import React from 'react'
import formatMatchTime from '../utils/formatMatchTime'
import Live from './Live'

const TeamSpan = styled.a`
  font-size: 0.9em;
  white-space: nowrap;
  text-decoration: none;
  color: white;
`

const TeamLeftSpan = styled(TeamSpan)`
  justify-self: end;
`

const TeamRightSpan = styled(TeamSpan)`
  justify-self: start;
`

const MatchConnectDiv = styled.a`
  font-size: 1em;
  font-weight: 600;

  text-decoration: none;
  color: white;
  justify-self: center;
  align-self: center;

  transform: scale(1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`

const MatchTimer = styled.a`
  padding: 0 10px;
  font-size: 0.7em;
  white-space: nowrap;
  text-decoration: none;
  color: white;

  justify-self: center;
`

const LogoLink = styled.a`
  justify-self: ${props => props.justifySelf};
  align-self: center;
`

const TeamLogo = styled.img`
  content: ${props => {   // if default team logo, get from assets/icons
    return props.url === 'default'
      ? `url(${require('../assets/icons/dota_small.png')})`
      : `url(${props.url})`
  }};

  width: 40px;
  height: 40px;
  object-fit: cover;

  transform: scale(1);
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.3));
  transition: filter 0.3s, transform 0.2s;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.6));
    transition: filter 0.4s, transform 0.2s;
  }
`

const Match = ({ match }) => {
  return (
    <React.Fragment>
      <TeamLeftSpan>
        {match.teamLeft.abbreviatedTitle}
      </TeamLeftSpan>
      <LogoLink
        href={match.teamLeft.teamLink}
        justifySelf="end"
      >
        <TeamLogo
          url={match.teamLeft.logoUrl}
        />
      </LogoLink>
      <MatchConnectDiv
        href={match.matchLink}
      >
        ✖
      </MatchConnectDiv>
      <LogoLink
        href={match.teamRight.teamLink}
        justifySelf="start"
      >
        <TeamLogo
          url={match.teamRight.logoUrl}
        />
      </LogoLink>
      <TeamRightSpan>
        {match.teamRight.abbreviatedTitle}
      </TeamRightSpan>
      <MatchTimer href={match.stream}>
        {match.matchTimestamp === 'Live'
          ? <Live />
          : formatMatchTime(match.matchTimestamp)
        }
      </MatchTimer>
    </React.Fragment>
  )
}

export default Match