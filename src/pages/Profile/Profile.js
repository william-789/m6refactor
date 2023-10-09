import Empty from "../../components/Empty/Empty";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/UserContext";
import axiosFest from "../../services/axiosfest";
import ListItem from "../../components/List_Item/ListItem";

function Profile() {
  const { userData, favorites, setFavorites, isFavorite } = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  const getData = async() => {
    await axiosFest.get("/participante/favoritos/listar", {params: {participante: userData.email}})
      .then((res) => {
        setFavorites(res.data.favoritos)
      }).then(()=>setLoading(false)).catch((e)=>{
        console.log(e)
        setFavorites([])
      })
  }

  useEffect(()=>{
    getData()
  }, [])

  if(loading) {
    return (
      <div className={"Profile page"}>A carregar</div>
    )
  }
  return (
    <div className={"Profile page"}>
      <h1>Favoritos</h1>
      {
        favorites.length === 0 ? <Empty item={"favoritos"}/> :
          favorites.slice(0,3).map((f)=>
          f.tipo === "evento" ?
            <ListItem key={f.id+"e"} image={f.imagem} title={f.designacao} line2={f.data.slice(0,10)} line3={f.local} idEl={f.id} favType={"event"} liked={isFavorite(f.id,"evento")} path={`/festival/${f.id}`}/>
            :
            <ListItem key={f.id+"a"} round={true} image={f.imagem} title={f.nome} line2={"Artista"} idEl={f.id} favType={"artist"} liked={isFavorite(f.id,"artista")} path={`/artist/${f.id}`}/>
          )
      }
      <h1>Pagamentos</h1>
      <Empty item={"pagamentos"} />
    </div>
  )
}

export default Profile
