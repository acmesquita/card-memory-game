import { createContext, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useBoard } from "../hooks/useBoard";
import { useRound } from "../hooks/useRound";

export const AppContext = createContext({})

const lengthBoard = 16

export function AppProvider({ children }) {
  const [started, setStarted] = useState(false)
  const [hasWin, setHasWin] = useState(false)

  const { round, addToRound, restartRound, validateRound } = useRound()
  const { matrix, newBoard, showCardsRound, hideCardsRound } = useBoard(lengthBoard)
  const { timer, zeroTimer, initTimer, stopTimer } = useTimer()


  function startGame() {
    setStarted(true)
    initTimer()
  }

  function restartGame() {
    newBoard()
    zeroTimer()
    setHasWin(false)
  }

  function clickCard(cardClicked) {
    if (started && round.length < 2) {
      const newRound = addToRound(cardClicked)
      showCardsRound(matrix, cardClicked)

      validateRound(newRound, metch, fail)

      if (validEndGame()) {
        setHasWin(true)
        stopTimer()
      }
    }
  }

  function validEndGame() {
    const cardsVisibled = matrix.filter(card => card.visible)
    return cardsVisibled.length === lengthBoard
  }

  function metch() {
    restartRound()
  }

  function fail(newRound) {
    const cardIds = newRound.map(item => item.id)
    hideCardsRound(matrix, cardIds)
    restartRound()
  }

  const data = {
    started,
    startGame,
    matrix,
    lengthBoard,
    clickCard,
    timer,
    hasWin,
    restartGame
  }

  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  )
}
