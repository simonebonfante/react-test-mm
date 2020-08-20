import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Score(props) {
  return (
    <Row>
      <Col>
        <div className="mb-5 text-left"><b>Score: {props.score} </b></div>
      </Col>
      <Col>
        <div className="mb-5 text-right"><b>Best Score: {props.best_score} </b></div>
      </Col>
    </Row>
   
  )
}

export default Score