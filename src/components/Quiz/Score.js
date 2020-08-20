import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

function Score(props) {
  var score = JSON.parse(localStorage.getItem('game'))[props.user]
  .filter(el => el.game_over)
  .sort(function(a, b) {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  })
  [0]
  const [best_score, setBestScore] = useState(score ? score.points : 'still none')
  return (
    <Row>
      <Col>
        <div className="mb-5 text-left"><b>Score: {props.score} </b></div>
      </Col>
      <Col>
        <div className="mb-5 text-right"><b>Best Score: {best_score} </b></div>
      </Col>
    </Row>
   
  )
}

export default Score