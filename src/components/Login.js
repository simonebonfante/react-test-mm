import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import {
  Redirect
} from "react-router-dom";

function Login(props) {
  const [nick_name, setNickName] = useState('')
  const [boolSave, setBoolSave] = useState(false)
  function handleChange(event) {
    setNickName(event.target.value);
  }

  var canRender = () => {
    if (!localStorage.getItem('user')) {
      return true
    } else {
      if (!JSON.parse(localStorage.getItem('user')).isUserLoggedIn)
        return true
    }
    return false
  }
  function handleSubmit(event) {
    alert('E\' stato inserito un nome: ' + nick_name);
    setBoolSave(true)
    event.preventDefault();
  }

  useEffect(() => {
    if(nick_name !== '') {
      localStorage.setItem('user', JSON.stringify({
        isUserLoggedIn: true,
        nick_name: nick_name
      }));

      let game = JSON.parse(localStorage.getItem('game')) || {}
      if (!game[nick_name]) {
        game[nick_name] = [{
          question_number: 0,
          points: 0,
          game_over: false
        }]
      }
      localStorage.setItem('game', JSON.stringify(game))
      props.callBackFromParent(true)
    }
  }, [boolSave]);
  if(canRender()) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Nick Name:
          <input type="text" value={nick_name} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
  return <Redirect to="/" />
  
}

export default Login;