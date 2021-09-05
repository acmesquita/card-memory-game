import { useContext } from 'react'
import Board from './components/Board'
import Info from './components/Info'
import { AppContext } from './context/AppContext'
import './styles/pages/App.css'

export default function App() {
  const { started, startGame } = useContext(AppContext)

  return (
    <div className="app-container">
      <h1 className="title">Card Memory Game</h1>
      {!started && (<button className="btn" onClick={startGame}>Start</button>)}
      {started && (<Info />)}
      <Board />
    </div>
  )
}
