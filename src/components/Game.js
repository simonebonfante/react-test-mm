import React, {useState, useEffect} from 'react'
import { Spinner } from 'react-bootstrap'
import MusixMatchService from '../services/MusixMatchService'
import Quiz from './Quiz/Quiz'

function Game(props) {
  const [loading, setLoading] = useState(true)
  const [initialState, setInitialState] = useState(true)
  const [track_list, setTrackList] = useState([])
  const [artist_list, setArtistList] = useState([])
  const [newGame, setNewGame] = useState(0)

  const newGameCallback = (data) => {
    setNewGame(newGame+data)
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function getTracks(track_list) {
    return Promise.all(
      track_list.data.message.body.track_list
      .map((el) => {
        return getLyrics(el)
      }
    ))
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
    return shuffle(arr)
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

  useEffect(() => {
    if(initialState) {
      setInitialState(false)
      MusixMatchService.getTracks().then(async (tl) => {
        var track_list = await getTracks(tl)
        setTrackList(track_list)
      }).catch(err => console.log(err))
      .finally(() => setLoading(false))
    }
  })


  useEffect(() => {
    console.log('new game')
  }, [newGame])

  return (
    <div>
      {
        !loading ?
        <Quiz data={getDataQuestionQuiz} length={track_list.length} user={props.user} newGameCallback={newGameCallback}/>
        : <div className="text-center">
        <Spinner animation="border" />
        </div>
      }
    </div>
  )
}

export default Game