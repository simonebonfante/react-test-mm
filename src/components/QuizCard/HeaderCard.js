import React from 'react'
import { Card } from 'react-bootstrap'

function HeaderCard(props) {
  return (
  <Card.Header>{props.text}</Card.Header>
  )
}

export default HeaderCard;