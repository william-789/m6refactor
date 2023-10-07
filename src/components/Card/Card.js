import React from "react";
import "./Card.scss";
import { baseImgLink } from "../../services/axiosfest";
import Like from "../Like/Like";
import {Link} from "react-router-dom";

function Card({ bought, clear = false, current, image, title, line2, line3, price, liked, path, favType, idEl }) {
  const bgImg = {
    backgroundImage: `url("${baseImgLink + image}")`
  };

  return (
    <div className={`Card ${bought ? 'bought' : ''} ${clear? 'clear' : ''}`} style={bgImg}>
      {current && <p className="side-info current">a acontecer</p>}
      <div className="info">
        {!clear && <Link to={path}>
          <div className="text">
            <h1>{title.toUpperCase()}</h1>
            <span>{line2}</span>
            <p>{line3}</p>
            {price && typeof price === 'number' ?
              <p className="side-info">{price.toFixed(2)} €</p>
              : <p className="side-info">{price}</p>
            }
          </div>
        </Link>}
        
        {bought ? (
          null
        ) : (
          <Like liked={liked} favType={favType} idFav={idEl}/>
        )}
      </div>
    </div>
  );
}

export default Card;
