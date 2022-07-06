const formatTime = (splitTimeArr) => {
  let hours = parseInt(splitTimeArr[0])
  let minutes = splitTimeArr[1]
  
  if (hours > 11) {
    return `${hours - 12}:${minutes}PM`
  }
  return `${hours}:${minutes}AM`
}

module.exports = {
  // sample of data from the date_time: 2017-06-01T08:30
  format_date: (date) => {
    const dateArrHalved = date.split('T')
    const dateArr = dateArrHalved[0].split('-')
    const timeArr = dateArrHalved[1].split(':')

    const formattedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
    const formattedTime = formatTime(timeArr)

    return `${formattedTime} on ${formattedDate}`;
  }
}
