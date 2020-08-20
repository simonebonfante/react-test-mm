import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

function Artist(props) {
  const [variantButton, setVariantButton] = useState("primary")

  const evaluateResponse = () => {
    if (props.correct) {
      setVariantButton("success")
      // nextQuestion it is called on QuizCard, which in turn is called on Quiz
      props.nextQuestion(1, props.track_id)
    } else {
      setVariantButton("danger")
      props.nextQuestion(0, props.track_id)
      
    }
  }

  return (
    <Button variant={variantButton} onClick={() => evaluateResponse()} disabled={props.disabled}>
      {props.artist}
    </Button>
  )
}

export default Artist;