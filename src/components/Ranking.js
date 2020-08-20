import React, {useState, useEffect} from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap'

function Ranking(props) {
  const getRanking = () => {
    var ranking = []
    let games = JSON.parse(localStorage.getItem('game'))
    Object.keys(games).forEach((user) => {
      var game =
        games[user].filter(el => el.game_over)
        .sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          }
          if (a.score > b.score) {
            return -1;
          }
          return 0;
        })
      if (game.length > 0)
        ranking.push({user: user, score: game[0].score})
    })
    return ranking.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    })
  }
  const [ranking, setRanking] = useState(getRanking())

  return (
    <div className="text-center mt-2">
      <h1>Ranking</h1>
      <p>This is the global ranking of the best players</p>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <ListGroup>
            {
              ranking.length > 0 ?
              ranking.map((el, index) =>
                  <ListGroup.Item key={index} active={props.user === el.user ? true : false}>{el.user} (<i>score: {el.score}</i>)</ListGroup.Item>
                )
              : <h2>no data available yet</h2>
            }
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default  Ranking