import React from 'react'
import { Button } from 'react-bootstrap'

function NewGame(props) {

  // create on localStorage a new istance of the game, and calls a callBack "newGame" to trigger the event
  function newGame() {
    var game = JSON.parse(localStorage.getItem('game'))
    game[props.user].push({
      question_number: 0,
      score: 0,
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

//{"Simone":[{"question_number": 0, "score": 0, "game_over": false}]}