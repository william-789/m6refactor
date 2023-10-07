import './List_Item.scss'
import { baseImgLink } from "../../services/axiosfest";
import Like from "../Like/Like";
function ListItem({round = false, image, title, line2, line3, liked = false, el, favType, iconType, idEl}) {
  return (
    <div className={`pill list-item  ${round ? 'round' : ''}`}>
      <img alt={title}
        src={baseImgLink + image}/>
        <div className="info">
          <div className="text">
            <h1>{title}</h1>
            <span>{ line2 }</span>
            {line3 && <p>{line3}</p>}
          </div>
          <Like liked={liked} favEl={el} favType={favType} type={iconType} idFav={idEl}/>
        </div>
    </div>
  )
}

export default ListItem
