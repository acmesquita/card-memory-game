import { useState } from "react";

export function useRound() {
  const [round, setRound] = useState([])

  return {
    round,
    addToRound: (card) => {
      const newRound = [...round, card]
      setRound(newRound)
      return newRound
    },
    restartRound: () => setRound([]),
    validateRound: (newRound, metch, fail) => {
      if (newRound.length === 2) {
        const [card1, card2] = newRound
        if (card1.value === card2.value) {
          metch()
        } else {
          fail(newRound)
        }
      }
    }
  }
}
