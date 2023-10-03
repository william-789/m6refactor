import './List_Item.scss'
import { baseImgLink } from "../../services/axiosfest";
import Like from "../Like/Like";
function ListItem({round = false, imagem, title, line2, line3, liked = false}) {
  return (
    <div className={`pill list-item  ${round ? 'round' : ''}`}>
      <img alt={title}
        src={baseImgLink + imagem}/>
        <div className="info">
          <div className="text">
            <h1>{title}</h1>
            <span>{ line2 }</span>
            {line3 && <p>line3</p>}
          </div>
          <Like liked={liked}/>
        </div>
    </div>
  )
}

export default ListItem
