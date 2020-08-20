import loadFromLocalStorage from '../helpers/LoadFromLocalStorage'

const reducer = (state = loadFromLocalStorage('game') || { questionNumber: 0, score: 0 }, action) => {
  switch (action.type) {
    case "NEXT":
      state.questionNumber = state.questionNumber + 1
      state.score = state.score + action.payload
      break;
  }
  return state
}

export default reducer