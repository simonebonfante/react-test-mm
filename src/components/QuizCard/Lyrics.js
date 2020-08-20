import React from 'react'
import { Card } from 'react-bootstrap'

function Lyrics(props) {
  return (
    <Card.Title className="text-center">{props.text}</Card.Title>
  )
}

export default Lyrics;