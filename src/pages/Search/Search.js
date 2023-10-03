import "./Search.scss"
import axiosFest from "../../services/axiosfest";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListItem from "../../components/List_Item/ListItem";
import { useState, useEffect } from "react";
function Search() {
  const [events, setEvents] = useState(null)
  const [artists,setArtists] = useState(null)
  const [eventsNext, setEventsNext] = useState([])
  const [artistsNext,setArtistsNext] = useState([])
  const [page, setPage] = useState(0)
  const [filtro,setFiltro] = useState("")

  useEffect(() => {
    axiosFest.get("/artistas/listar", {params:{numero_resultados:filtro ? 3 : 4, pagina: page}}).then((res)=> {
      console.log(res.data.artistas)
      setArtists(res.data.artistas)
    })
    axiosFest.get("/evento/listar", {params:{numero_resultados:3, pagina: page}}).then((res)=> {
      console.log(res.data)
      setEvents(res.data.eventos)
    })

    if(filtro) {
      axiosFest.get("/artistas/listar", {params:{numero_resultados:3, pagina: page + 1}}).then((res)=> {
        console.log(res.data.artistas)
        setArtistsNext(res.data.artistas)
      })
      axiosFest.get("/evento/listar", {params:{numero_resultados:3, pagina: page + 1}}).then((res)=> {
        console.log(res.data)
        setEventsNext(res.data.eventos)
      })
    }
  },[filtro, page])

  // page navigation controller
  const lastPage = eventsNext.length === 0 && artistsNext.length === 0;
  const singlePage = lastPage && page === 0;

  if(!(artists && events)) {
    return (
      <div className={"Search page"}>A carregar...</div>
    )
  }

  return (
    <div className={"Search page"}>
      <SearchBar setFilter={setFiltro} />
      {!filtro && <h1>Festivais</h1>}
      {
        events.length === 0 ?
          <p>Sem eventos encontrados.</p>
          :
        events.map((e) => <ListItem key={e.id} imagem={e.imagem} title={e.designacao} line2={e.local} />)
      }
      {!filtro && <h1>Artistas</h1>}
      {
        artists.length === 0 ?
          <p>Sem artistas encontrados.</p>
          :
        artists.map((a) => <ListItem key={a.id} round={true} imagem={a.imagem} title={a.nome} line2={"Artista"} />)
      }
    </div>
  )
}

export default Search
