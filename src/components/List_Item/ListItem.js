import './List_Item.scss'
import { baseImgLink } from "../../services/axiosfest";
import Like from "../Like/Like";
import {Link} from "react-router-dom";
function ListItem({round = false, image, title, line2, line3, liked = false, favType, iconType, idEl, path}) {
  return (
    <div className={`pill list-item  ${round ? 'round' : ''}`}>
      <Link to={path}>
        <img alt={title}
             src={baseImgLink + image}/>
      </Link>
        <div className="info">
          <Link to={path}>
            <div className="text">
              <h1>{title}</h1>
              <span>{ line2 }</span>
              {line3 && <p>{line3}</p>}
            </div>
          </Link>
          <Like liked={liked} favType={favType} type={iconType} idFav={idEl}/>
        </div>
    </div>
  )
}

export default ListItem
