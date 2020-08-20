import React, { useState, useEffect } from 'react'

function CountDown(props) {
  const [seconds, setSeconds] = useState(15)

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0)
        setSeconds(seconds-1)
      else
        props.nextQuestion(0)
    }, 1000)
    return () => clearInterval(myInterval)
  })

  return (
    <div>Time Left: {seconds}</div>
  )
}

export default CountDown