import React, {useState, useEffect} from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap'
import config from '../config'

function MyGames(props) {
  const getMygames = () => {
    var mygames = JSON.parse(localStorage.getItem('game'))[props.user].filter(el => el.game_over)
    return mygames.slice(0, config.n_quiz)
  }
  const [mygames, setMyGames] = useState(getMygames())

  return (
    <div className="text-center mt-2">
      <h1>My Games</h1>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h3>Welcome, {props.user}</h3>
          <p>This is the report of your last {config.n_quiz} finished games</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
        <ListGroup>
            {
              mygames.length > 0 ?
              mygames.map((el, index) =>
                  <ListGroup.Item key={index}>{el.score} score</ListGroup.Item>
                )
              : <h2>no data available yet</h2>
            }
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default  MyGames