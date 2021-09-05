import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { formatTimer } from "../utils/formatTimer"
import '../styles/components/Info.css'

export default function Info() {
  const { timer, hasWin, restartGame } = useContext(AppContext)

  return (
    <div className="info-container">
      <p className="timer">Timer: {formatTimer(timer)}</p>
      {hasWin && (<p className="contragts">Parabéns!!!</p>)}
      {hasWin && (<button onClick={restartGame} className="btnRestart">Restart</button>)}
    </div>
  )
}
