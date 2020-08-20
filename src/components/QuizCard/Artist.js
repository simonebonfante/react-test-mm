import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

function Artist(props) {
  const [variantButton, setVariantButton] = useState("primary")

  const printOk = () => {
    var data
    if (props.correct) {
      data = 'Risposta Esatta'
      setVariantButton("success")
      props.nextQuestion(1)
    } else {
      data = 'Risposta Sbagliata'
      setVariantButton("danger")
      props.nextQuestion(0)
      
    }
    alert(data)
  }

  return (
    <Button variant={variantButton} onClick={() => printOk()} disabled={props.disabled}>
      {props.artist}
    </Button>
  )
}

export default Artist;