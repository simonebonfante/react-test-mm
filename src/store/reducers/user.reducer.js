import loadFromLocalStorage from '../helpers/LoadFromLocalStorage'

const reducer = (state = loadFromLocalStorage('user') || { isUserLoggedIn: false, username: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      state.isUserLoggedIn = true
      state.username = action.payload
      break;
    case "LOGOUT":
      state.isUserLoggedIn = false
      state.username = null
      break;
  }
  return state
}

export default reducer