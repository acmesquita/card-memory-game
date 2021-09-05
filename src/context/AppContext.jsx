import { createContext, useEffect, useState } from "react";
import { shuffle } from '../utils/shuffler';

import {
  Gi3DGlasses,
  Gi3DHammer,
  GiAcorn,
  GiAnchor,
  GiAquarium,
  GiAsparagus,
  GiAtom,
  GiBasketballBasket,
  GiBigDiamondRing,
  GiBoomerangSun,
  GiBootPrints,
  GiBoxingGlove,
  GiBullseye,
  GiCamel,
  GiDiplodocus,
  GiFClef,
} from 'react-icons/gi'
export const AppContext = createContext({})

const lengthBoard = 16
const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
const icons = shuffle([
  Gi3DGlasses,
  Gi3DHammer,
  GiAcorn,
  GiAnchor,
  GiAquarium,
  GiAsparagus,
  GiAtom,
  GiBasketballBasket,
  GiBigDiamondRing,
  GiBoomerangSun,
  GiBootPrints,
  GiBoxingGlove,
  GiBullseye,
  GiCamel,
  GiDiplodocus,
  GiFClef,
])

const cards = alphabetArray
  .splice(0, lengthBoard / 2)
  .map((item, index) => ({ value: item.toUpperCase(), visible: false, icon: icons[index] }))

const board = shuffle([...cards, ...cards]).map((item, index) => ({ ...item, id: index }))

export function AppProvider({ children }) {
  const [started, setStarted] = useState(false)
  const [round, setRound] = useState([])
  const [matrix, setMatrix] = useState(board)

  const [timer, setTimer] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [hasWin, setHasWin] = useState(false)

  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        setTimer(state => state += 1)
      }, 1000)
    }
  }, [timer, startTimer, started])

  function startGame() {
    setStarted(true)
    setStartTimer(true)
  }

  function restartGame() {
    setMatrix(shuffle([...cards, ...cards]).map((item, index) => ({ ...item, id: index })))
    setTimer(0)
    setStartTimer(true)
    setHasWin(false)
  }

  function clickCard(cardClicked) {
    if (started && round.length < 2) {
      const newRound = [...round, cardClicked]
      setRound(newRound)
      showRound(cardClicked)

      if (newRound.length === 2) {
        const [card1, card2] = newRound
        if (card1.value === card2.value) {
          metch()
        } else {
          fail(newRound)
        }
      }

      if (validEndGame()) {
        setHasWin(true)
        setStartTimer(false)
      }
    }
  }

  function validEndGame() {
    const cardsVisibled = matrix.filter(card => card.visible)
    return cardsVisibled.length === lengthBoard
  }

  function showRound(cardClicked) {
    setMatrix(matrix.map(card => {
      if (card.id === cardClicked.id) {
        card.visible = true
      }
      return card
    }))
  }

  function restartRound() {
    setRound([])
  }

  function metch() {
    restartRound()
  }

  function fail(newRound) {
    const cardIds = newRound.map(item => item.id)
    setTimeout(() => {
      setMatrix(matrix.map(card => {
        if (cardIds.includes(card.id)) {
          card.visible = false
        }
        return card
      }))
    }, 500)

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
