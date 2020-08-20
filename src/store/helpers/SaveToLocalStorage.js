export default (state, label) => {
  try {
    const serializedState = state ? JSON.stringify(state) : JSON.stringify({ questionNumber: 0, points: 0 })
    localStorage.setItem(label, serializedState)
  } catch(err) {
    console.log(err)
  }
}