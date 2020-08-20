import React, { useState, useEffect } from 'react'
import config from '../../config'

function CountDown(props) {
  const [seconds, setSeconds] = useState(config.count_down)

  // "count_down" second countdown, editable on the config file
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
    <div className="mt-4">
      <h1>Time Left: {seconds}</h1>
    </div>
  )
}

export default CountDown