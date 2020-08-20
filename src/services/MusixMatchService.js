import Api from './Api'
import config from '../config'

export default {
  getTracks() {
    return Api().get(`/chart.tracks.get?chart_name=top&page=1&page_size=${config.n_quiz}&country=it&f_has_lyrics=1&apikey=${config.apikey}`)
  },
  getLyrics(track_id) {
    return Api().get(`/track.lyrics.get?track_id=${track_id}&apikey=${config.apikey}`)
  }
}


