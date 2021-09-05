import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import '../styles/components/Card.css'

export default function Card({ value, icon: Icon, visible }) {

  const { clickCard } = useContext(AppContext)

  function handleClick() {
    clickCard(value)
  }

  return (
    <div
      className={`card`}
      onClick={handleClick}
    >
      <span className={`${visible ? "show" : "hide"}`}>
        {<Icon size={32} color="#fff" />}
      </span>
    </div >
  )
}
