import loadFromLocalStorage from '../helpers/LoadFromLocalStorage'

const reducer = (state = loadFromLocalStorage('game') || { questionNumber: 0, points: 0 }, action) => {
  switch (action.type) {
    case "NEXT":
      state.questionNumber = state.questionNumber + 1
      state.points = state.points + action.payload
      break;
  }
  return state
}

export default reducer