import { useParams } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import axiosFest from "../../services/axiosfest";
import { useContext, useEffect, useState } from "react";
import ListItem from "../../components/List_Item/ListItem";
import {UserContext} from "../../context/UserContext";

function Artist() {
  const { id_artist } = useParams()
  const { isFavorite } = useContext(UserContext)
  const [artist, setArtist] = useState(null)
  const [shows, setShows] = useState(null)
  const getData = async () => {
    await axiosFest.get(`/artistas/${id_artist}/detalhes`)
      .then((res)=> setArtist(res.data.artista))
    await axiosFest.get(`/artistas/${id_artist}/concertos`, {params: {pagina: 0, numero_resultados: 3}})
      .then((res)=>setShows(res.data.concertos))
  }
  useEffect(() => {
    getData()
  }, [])

  if(!(artist && shows)) {
    return(
      <div className={"Artist page"}>A carregar</div>
    )
  }
  return(
    <div className={"Artist page"}>
      <Banner liked={isFavorite(artist.id,"artista")} idFav={artist.id} favType={"artist"} image={artist.imagem} nome={artist.nome}/>
        <h1>Próximos concertos</h1>
        {
          shows.map((s) =>
          <ListItem key={s.id+"s"} image={s.imagem} title={s.evento} line2={s.data_hora_inicio.slice(0,10)} line3={s.palco} path={`/festival/${s.evento_id}`} liked={isFavorite(s.evento_id,"evento")} />
          )
        }
        <h1>Sobre</h1>
        <p>{artist.biografia}</p>
    </div>
  )
}

export default Artist
