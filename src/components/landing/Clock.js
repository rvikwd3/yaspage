import { useState, useEffect } from 'react'
import styled from 'styled-components'

const formatMinutes = (minutes) => {
  return minutes > 9
    ? minutes
    : '0' + minutes.toString()
}

const formatHours = (hours) => {
  return hours === 0
    ? '00'
    : hours
}

const Clock = ({ className }) => {
  const [time, setTime] = useState(new Date())

  const formattedTime = `${formatHours(time.getHours())}:${formatMinutes(time.getMinutes())}`

  useEffect( () => {
    let secTimer = setInterval( () => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(secTimer)
  }, [])

  return (
    <div className={className}>
      <span>{formattedTime}</span>
    </div>
  )
}

const Clock_Styled = styled(Clock)`
  grid-row: 1;

  color: white;
  letter-spacing: 20px;
  text-indent: 20px;
  font-size: clamp(100px, 4vw, 220px);
  font-weight: 800;

  text-shadow: 5px 8px 15px rgba(20,20,20,0.4);
`

export default Clock_Styled