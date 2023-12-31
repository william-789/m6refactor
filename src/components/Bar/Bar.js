import React from "react";
import "./Bar.scss"
import Like from "../Like/Like";
import infoIcon from "../../assets/icons/info_circle.svg"
function MainBar({ type = "main", icon1, text, price, icon2 }) {
  return (
    <div className={`bar ${type}`}>
      {
        type === "notice" ? (
          <>
            <Like type={"info"}/>
            <span>{text}</span>
          </>
        ) : (
          <>
            <img src={icon1} alt="" />
            <p>{text}</p>
            {icon2 ? (<img src={icon2} alt="" />) :
              (
                <p>{price.toFixed(2)} €</p>
              )}
          </>
        )
      }
    </div>);
}

export default MainBar;

function NoticeBar({ message }) {
  return (
    <div className="bar notice">
      <img alt="notice" src={infoIcon} />
      <span>{message || "Existem pagamentos pendentes na tua conta"}</span>
    </div>
  );
}

export { NoticeBar }
