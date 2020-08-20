import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

function NewGame(props) {
  function newGame() {
    var game = JSON.parse(localStorage.getItem('game'))
    game[props.user].push({
      question_number: 0,
      points: 0,
      game_over: false
    })
    localStorage.setItem('game', JSON.stringify(game))
    props.newGame(1)
  }

  return (
    <Button className="mt-4" variant="success" onClick={() => newGame()}>New Game</Button>
  )
}

export default NewGame

//{"Simone":[{"question_number": 0, "points": 0, "game_over": false}]}