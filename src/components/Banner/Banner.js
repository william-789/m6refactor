import "./Banner.scss"
import Like from "../Like/Like";
import { baseImgLink } from "../../services/axiosfest";

function Banner({liked, idFav, favType, image, nome}) {
  const bgImg = {
    backgroundImage: `url("${baseImgLink + image}")`,
  };

  return(
    <div className={"Banner"}>
      <div className={"background"} style={bgImg}></div>
      <div className={"data"}>
        <img alt={nome} src={baseImgLink + image} />
        <div>
          <h1>{nome}</h1>
          <span>Artista</span>
        </div>
      </div>
      <Like liked={liked} idFav={idFav} favType={favType} />
    </div>
  )
}

export default Banner
