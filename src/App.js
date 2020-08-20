import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Quiz from './components/Quiz/Quiz'
import Login from './components/Login'
import MyNavBar from './components/MyNavBar'
import Ranking from './components/Ranking'
import MyGames from './components/MyGames'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios';

import './App.css';

function App() {
  const [loggedIn, setLogin] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).isUserLoggedIn
    : false
  )
  const [user, setUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).nick_name
    : ''
  )

  const myCallBack = (dataFromChild) => {
    setLogin(dataFromChild)
  }

  useEffect(() => {
    if(loggedIn)
      setUser(JSON.parse(localStorage.getItem('user')).nick_name)
  }, [loggedIn]);
 
  return (
    <Router>
      <div>
        <MyNavBar myNickName={user} loggedIn={loggedIn} callBackFromParent={myCallBack} />
        <Switch>
          <Route path="/login">
            <Login callBackFromParent={myCallBack} />
          </Route>
          <Route path="/ranking">
            {
              loggedIn ? <Ranking user={user || null} />
              : <Redirect to="/login"/>
            }
          </Route>
          <Route path="/my-games">
            {
              loggedIn ? <MyGames user={user || null}/>
              : <Redirect to="/login"/>
            }
          </Route>
          <Route path="/">
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              {
                loggedIn ? <Quiz className="quiz_card" user={user} />
                : <Redirect to="/login"/>
              }
            </Col>
          </Row>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
