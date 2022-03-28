import { useState, useEffect } from 'react'
import styled from 'styled-components'

const FormattedDate = ({ className }) => {
  const [date, setDate] = useState(new Date())

  useEffect( () => {
    let dayTimer = setInterval( () => {
      setDate(new Date())
    }, 60 * 1000)

    return () => clearInterval(dayTimer)
  }, [])
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className={className}>
      <span>{days[date.getDay()]},&nbsp;&nbsp;{months[date.getMonth()]} {date.getDate()}</span>
    </div>
  )
}

const Date_Styled = styled(FormattedDate)`
  grid-row: 3;

  font-size: 32px;
  font-weight: 500;
  text-shadow: 2px 2px 8px rgba(20,20,20,0.4);
  color: white;
`

export default Date_Styled