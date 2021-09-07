import { useState } from 'react';
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
import { shuffle } from '../utils/shuffler';

export function useBoard(lengthBoard = 16) {
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

  const [matrix, setMatrix] = useState(board)

  return {
    matrix,
    newBoard: () => setMatrix(shuffle([...cards, ...cards]).map((item, index) => ({ ...item, id: index }))),
    showCardsRound: (matrix, cardClicked) => {
      setMatrix(matrix.map(card => {
        if (card.id === cardClicked.id) {
          card.visible = true
        }
        return card
      }))
    },
    hideCardsRound: (matrix, cardIds) => {
      setTimeout(() => {
        setMatrix(matrix.map(card => {
          if (cardIds.includes(card.id)) {
            card.visible = false
          }
          return card
        }))
      }, 500)
    }
  }
}
