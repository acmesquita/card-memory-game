import Card from "./Card";
import '../styles/components/Board.css';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Board() {

  const { lengthBoard, matrix } = useContext(AppContext)

  function getValueMatrix(id) {
    return matrix[id]
  }

  return (
    <div className="board-container">
      {Array.from({ length: lengthBoard },
        (_, k) => {
          const card = getValueMatrix(k)
          return (
            <Card
              key={k}
              value={card}
              visible={card.visible}
              icon={card.icon}
            />)
        })
      }
    </div>
  )
}
