import React from "react";
import "./Card.scss";
import { baseImgLink } from "../../services/axiosfest";
import Like from "../Like/Like";

function Card({ bought, current, image, title, line2, line3, price, liked }) {
  const bgImg = {
    backgroundImage: `url("${baseImgLink + image}")`
  };

  return (
    <div className={`Card ${bought ? 'bought' : ''}`} style={bgImg}>
      {current && <p className="side-info current">a acontecer</p>}
      <div className="info">
        <div className="text">
          <h1>{title.toUpperCase()}</h1>
          <span>{line2}</span>
          <p>{line3}</p>
          {price && <p className="side-info">{price.toFixed(2)} €</p>}
        </div>
        {bought ? (
          null
        ) : (
          <Like liked={liked} />
        )}
      </div>
    </div>
  );
}

export default Card;
