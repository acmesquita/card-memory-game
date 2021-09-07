import { useEffect, useState } from "react"

export function useTimer() {
  const [timer, setTimer] = useState(0)
  const [startTimer, setStartTimer] = useState(false)

  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        setTimer(state => state += 1)
      }, 1000)
    }
  }, [timer, startTimer])

  return {
    timer,
    zeroTimer: () => { setTimer(0); setStartTimer(true) },
    stopTimer: () => { setStartTimer(false) },
    initTimer: () => { setStartTimer(true) }
  }
}
