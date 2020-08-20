export default (state) => {
  try {
    const serializedState = localStorage.getItem(state)
    return !serializedState ? undefined : JSON.parse(serializedState)
  } catch(err) {
    console.log(err)
  }
}
