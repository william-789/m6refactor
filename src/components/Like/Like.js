import React, {useContext, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull, faInfo } from "@fortawesome/free-solid-svg-icons";
import ticket from "../../assets/icons/nav_ticket_active.svg";
import {UserContext} from "../../context/UserContext";
import axiosfest from "../../services/axiosfest";

function Like({ type = "like", liked = false, favType, idFav }) {
  const { userData, toggleFavLocal } = useContext(UserContext)
  const { email } = userData
  const [isLiked, setIsLiked] = useState(liked);

  const toggleFav = async () => {
    const favPath = favType === "event" ? 'toggle_evento' : 'toggle_artista'
    const fav = favType === "event" ? 'evento' : 'artista'
    try {
      await axiosfest.post(`/participante/favoritos/${favPath}`, {
        participante: email,
        [fav]: idFav
      })
    } catch (e) {
      console.log(e)
    }

    toggleFavLocal(idFav, fav)
    setIsLiked(!isLiked)
  }

  if (type === "info") {
    return <FontAwesomeIcon icon={faInfo} className="side-info like" />;
  } else if (type === "ticket") {
    return (
        <img
            src={ticket}
            alt=""
            className="side-info like ticket"
        />
    );
  } else {
    const icon = isLiked ? faHeartFull : faHeart;
    return <FontAwesomeIcon icon={icon} className="side-info like" onClick={()=>{toggleFav()}}/>;
  }
}

export default Like;

