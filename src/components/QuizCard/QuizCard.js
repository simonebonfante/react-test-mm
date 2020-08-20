import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import HeaderCard from './HeaderCard'
import Lyrics from './Lyrics'
import Artist from './Artist'
import CountDown from './CountDown'

function QuizCard(props) {
  const [disabled, setButtonDisabled] = useState(false)

  const nextQuestion = (score, track_id) => {
    setButtonDisabled(true)
    props.nextQuestion(score, track_id)
  }  
  // // const artists = props.artists
  // console.log(generateQuizQuestion())
  // const question = generateQuizQuestion()
  // // const artists = [
  // //   { text: 'Tiziano Ferro', correct: false },
  // //   { text: 'Vasco Rossi', correct: true },
  // //   { text: 'Ligabue', correct: false },
  // // ]
  // // const lyrics = "AAAA "+props.n
  // const lyrics = question.lyrics
  // const artists = question.artists

  useEffect(() => {
    return () => {}
  });
  const lista = props.el.artists.map((el, index) =>
    <Col key={index} className="text-center">
      <Artist artist={el.name} track_id={props.el.track_id} correct={el.correct} n={props.n} disabled={disabled} nextQuestion={nextQuestion}/>
    </Col>
  )
  return (
    <div>
      <CountDown nextQuestion={nextQuestion} />
      <Card>
        <HeaderCard text={"question number " + props.n}/>
        <Card.Body>
          <Lyrics text={props.el.lyrics}/>
          <Row className="mt-5 text-center">
            {
              lista
            }
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default QuizCard