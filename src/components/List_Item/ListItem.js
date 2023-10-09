import './List_Item.scss'
import { baseImgLink } from "../../services/axiosfest";
import Like from "../Like/Like";
import {Link} from "react-router-dom";
function ListItem({round = false, image, title, line2, line3, liked = false, favType, iconType, idEl, path}) {
  return (
    <div className={`pill list-item  ${round ? 'round' : ''}`}>
      <Link to={path}>
        <div className={"img-div"}>
          <img alt={title}
               src={baseImgLink + image}/>
        </div>
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

function Pill({ image, title, line2, line3, price = 0, available, openModal, passData }) {
  const handleClick = () => {
    openModal(true);
    passData({ title, line2, line3, price, available })
  };

  return (
    <div className={`pill movement ${ available ? "available" : 'unavailable' }`} onClick={available ? handleClick : null}>
      <div className="img-div">
        <img alt={title} src={image} />
      </div>
      <div className="info">
        <div className="text">
          { title && <h1>{title}</h1> }
          <span>{line2}</span>
          {line3 && <p>{line3}</p>}
        </div>
        <p className="side-info">{price.toFixed(2)} €</p>
      </div>
    </div>
  );
}

export {
  ListItem,
  Pill
}
