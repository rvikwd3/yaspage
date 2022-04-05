import Live from '../components/Live'

const formatMatchTime = (timestamp) => {
  const nowDate = new Date()
  const matchDate = new Date(timestamp)

  const timeDiff = matchDate - nowDate
  if (timeDiff <= 0) {
    return <Live />
  } else {
    const days = Math.floor(timeDiff / ( 24 * 3600 * 1000 ))
    const hours = Math.floor(( timeDiff / ( 3600 * 1000 ) ) % 24)
    const min = Math.floor(( timeDiff / (60 * 1000 ) ) % 60)

    // console.log(`Days ${days}\nHours ${hours}\nMin ${min}`)
    const formattedMatchTime = `in ${days>0 ? days.toString() + 'd': ''} ${hours>0 ? hours.toString() + 'h': ''} ${min>0 ? min.toString() + 'm': ''}`
    return formattedMatchTime
  }
}

export default formatMatchTime