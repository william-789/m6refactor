import Empty from "../../components/Empty/Empty";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosFest from "../../services/axiosfest";
import ListItem from "../../components/List_Item/ListItem";
import Pagination from "../../components/Pagination/Pagination";

function Profile() {
  const { userData } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [pageFav, setPageFav] = useState(0)
  const [favProfile, setFavProfile] = useState(null)
  const [favoritesNext, setFavoritesNext] = useState([])

  const getData = async() => {
    await axiosFest.get("/participante/favoritos/listar", {params: {participante: userData.email, pagina: pageFav}})
      .then((res) => {
        setFavProfile(res.data.favoritos)
      }).catch((e)=>{
        console.log(e)
        setFavProfile([])
      })
    await axiosFest.get("/participante/favoritos/listar", {params: {participante: userData.email, pagina: pageFav + 1}})
      .then((res) => {
        setFavoritesNext(res.data.favoritos)
      }).catch((e)=>{
        console.log(e)
        setFavProfile([])
      })
    console.log(favProfile)
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  }, [pageFav])

  if(loading) {
    return (
      <div className={"Profile page"}>A carregar</div>
    )
  }

  // page navigation controller
  const lastPageFav = favoritesNext.length === 0;
  const singlePageFav = lastPageFav && pageFav === 0;

  return (
    <div className={"Profile page"}>
      <h1>Favoritos</h1>
      {
        favProfile.length === 0 ? <Empty item={"favoritos"}/> :
          favProfile.slice(0,3).map((f)=>
          f.tipo === "evento" ?
            <ListItem key={f.id+"e"} image={f.imagem} title={f.nome} line2={f.data.slice(0,10)} line3={f.local} idEl={f.id} favType={"event"} liked={true} path={`/festival/${f.id}`}/>
            :
            <ListItem key={f.id+"a"} round={true} image={f.imagem} title={f.nome} line2={"Artista"} idEl={f.id} favType={"artist"} liked={true} path={`/artist/${f.id}`}/>
          )
      }
      {favProfile.length > 0 && !singlePageFav && <Pagination page={pageFav} setPage={setPageFav} lastPage={lastPageFav}/>}
      <h1>Pagamentos</h1>
      <Empty item={"pagamentos"} />
    </div>
  )
}

export default Profile
