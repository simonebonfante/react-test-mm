import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import gameReducer from './game.reducer'

export default combineReducers({
  userReducer,
  gameReducer
})