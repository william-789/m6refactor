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

function Pill({ id, image, title, line2, line3, price = 0, available, onModal = false, openModal, passData, pay = false, paid}) {
  const handleClick = () => {
    if(!onModal) {
      openModal(true);
      passData({title, line2, line3, price, available, id})
    }
  };

  return (
    <div className={`pill movement ${available ? "available" : !pay && 'unavailable' } ${paid && "green"}`} onClick={available ? handleClick : null}>
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

function MovementItem ({icon, value, data, hora, saldo, tipo}) {
  return (
    <div className={`pill s-pill ${tipo}`}>
      <div className="img-div">
        <img alt="" src={icon} />
      </div>
      <div className="info">
        <div className="text">
          <span>{value.toFixed(2)} €</span>
          <p>{data} {hora}</p>
        </div>
        <p className="side-info">{saldo.toFixed(2)} €</p>
      </div>
    </div>

)
}

export {
  ListItem,
  Pill,
  MovementItem
}
