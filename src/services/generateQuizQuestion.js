import config from '../config'

export default () => {
  let questions = [
    {lyrics: "Ehi ciao sono una lyrics", artists: [{ text: 'Tiziano Ferro', correct: false },{ text: 'Vasco Rossi', correct: true },{ text: 'Ligabue', correct: false }]},
    {lyrics: "Lyrics 1", artists: [{ text: 'A1', correct: false },{ text: 'B1', correct: true },{ text: 'C1', correct: false }]},
    {lyrics: "Lyrics 2", artists: [{ text: 'A2', correct: false },{ text: 'B2', correct: true },{ text: 'C2', correct: false }]},
    {lyrics: "Lyrics 3", artists: [{ text: 'A3', correct: false },{ text: 'B3', correct: true },{ text: 'C3', correct: false }]}
  ]
  return(
    questions[Math.floor(Math.random() * (+config.n_quiz - +0)) + +0]
  )
}