import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import QuizCard from '../QuizCard/QuizCard'
import Score from './Score'
import NewGame from './NewGame'
import { Redirect } from 'react-router-dom'
import MusixMatchService from '../../services/MusixMatchService'
import config from '../../config'

function Quiz(props) {
  var myGame = JSON.parse(localStorage.getItem('game'))[props.user].filter(el => !el.game_over)[0]
  || JSON.parse(localStorage.getItem('game'))[props.user][JSON.parse(localStorage.getItem('game'))[props.user].length -1] // oppure l'ultimo

  const [status_game, setStatusGame] = useState(myGame.question_number);
  const [gameState, setGameState] = useState(myGame)
  const [loading, setLoading] = useState(true)
  const [initialState, setInitialState] = useState(true)
  const [track_list, setTrackList] = useState([])
  const [artist_list, setArtistList] = useState([])
  const [newGame, setNewGame] = useState(0)

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const newGameCallback = (data) => {
    setNewGame(newGame+data)
  }

  const getDataQuestionQuiz = () => {
    let arr = []
    for (let i = 0; i<track_list.length; i++) {
      let artist_tmp = artist_list
      let correct_arstist = artist_tmp.filter(el => el.track_id === track_list[i].track_id)[0].artist
      let wrong_artist1 = shuffle(artist_tmp).filter(el => el.track_id !== track_list[i].track_id)[0].artist
      let wrong_artist2 = shuffle(artist_tmp).filter(el => el.track_id !== track_list[i].track_id && el.artist !== wrong_artist1)[1].artist
      let artists = [
        {name: correct_arstist, correct: true},
        {name: wrong_artist1, correct: false},
        {name: wrong_artist2, correct: false}
      ]
      arr[i] = {lyrics: track_list[i].lyrics, artists: shuffle(artists)}
    }
    console.log('arr', arr)
    return shuffle(arr)
  }

  const nextQuestion = (point) => {
    var game = JSON.parse(localStorage.getItem('game'))
    for (let i = 0; i<game[props.user].length; i++) {
      var el = game[props.user][i]
      if (!el.game_over) {
        game[props.user][i] = {
          ...el,
          question_number: status_game+1,
          points: el.points + point,
          game_over: status_game === config.n_quiz-1 ? true : false
        }
        break
      }
    }
    myGame = game[props.user]
    console.log('Set item', game)
    localStorage.setItem('game', JSON.stringify(game))
    setTimeout(() => {
      setStatusGame(status_game+1)
    }, 2500)
  }

  var canRender = () => {
    if (!localStorage.getItem('user')) {
      return false
    } else {
      if (!JSON.parse(localStorage.getItem('user')).isUserLoggedIn)
        return false
    }
    return true
  }

  async function getLyrics(el) {
    return MusixMatchService.getLyrics(el.track.track_id).then((lyrics) => {
      var track = {
        track_id: el.track.track_id,
        track_name: el.track.track_name,
        artist: el.track.artist_name,
        artists: [{name: el.track.artist_name, correct: true}],
        lyrics: lyrics.data.message.body.lyrics.lyrics_body.split("*******")[0],
      }
      let artists = artist_list
      artists.push({track_id: track.track_id, artist: track.artist})
      setArtistList(artists)
      return track
    }).catch(err => {
      return err
    }) 
  }

  async function getTracks(track_list) {
    return Promise.all(
      track_list.data.message.body.track_list
      .map((el) => {
        return getLyrics(el)
      }
    ))
  }

  useEffect(() => {
    if(initialState) {
      setInitialState(false)
      MusixMatchService.getTracks().then(async (tl) => {
        console.log('track_list', tl)
        var track_list = await getTracks(tl)
        setTrackList(track_list)
      }).catch(err => console.log(err))
      .finally(() => setLoading(false))
    }
  })

  useEffect(() => {
    if(newGame !== 0) {
      setStatusGame(0)
    }
  }, [newGame])

  useEffect(() => {
    setGameState(myGame)
  }, [status_game])

  if(canRender()) {
    if (config.n_quiz > 0) {
      return (
        <div>
          <div className="mb-3 text-center">
            <h1 >Who Sings?</h1>
            <i>The quiz consists of {config.n_quiz} question{config.n_quiz > 1 ? 's' : ''}</i>
          </div>
          {/* {
            <div className="mb-5"><b>Best Score: {gameState.points} </b></div> 
          } */}
          <Score user={props.user} score={gameState.points}/>
          { !loading ?
              status_game < track_list.length ?
                // questionsShuffled(questions)
                getDataQuestionQuiz()
                .map((el, index) =>
                  index === status_game ?
                  <QuizCard key={index} n={index+1} el={el} nextQuestion={nextQuestion}/>
                  : <div key={index}></div>
                )
              : <div className="text-center">
                  <h1>Game Over</h1>
                  <p> You answered {gameState.points} out of {config.n_quiz} questions correctly</p>
                  <NewGame user={props.user} newGame={newGameCallback}/>
                </div>
            : <div className="text-center">
                <Spinner animation="border" />
              </div>
          }
        </div>
      )
    } else return (<h1 className="text-center">No questions</h1>)
  }
  return <Redirect to="/login"/>
}

export default Quiz;