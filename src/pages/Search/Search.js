import "./Search.scss"
import axiosFest from "../../services/axiosfest";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListItem from "../../components/List_Item/ListItem";
import { useState, useEffect } from "react";
function Search() {
  const [events, setEvents] = useState(null)
  const [artists, setArtists] = useState(null)
  const [eventsNext, setEventsNext] = useState([])
  const [artistsNext, setArtistsNext] = useState([])
  const [page, setPage] = useState(0)
  const [filtro, setFiltro] = useState("")
  const [searchResults, setSearchResults] = useState([])

  function typeData(data, type) {
    return data.map((el) => {
      return {
        ...el,
      type
      }
    })
  }

  const getData = async () => {
    const combinedRes = []
    await axiosFest.get("/artistas/listar", {params:{numero_resultados:filtro ? 3 : 4, pagina: page, pesquisa: filtro}}).then((res)=> {
      const typedRes = typeData(res.data.artistas, "artist")
      combinedRes.push(...typedRes)
      setArtists(typedRes)
    })
    await axiosFest.get("/evento/listar", {params:{numero_resultados:3, pagina: page, pesquisa: filtro}}).then((res)=> {
      const typedRes = typeData(res.data.eventos, "event")
      combinedRes.push(...typedRes)
      setEvents(typeData(res.data.eventos, "event"))
    })

    setSearchResults(combinedRes)

    if(filtro) {
      await axiosFest.get("/artistas/listar", {params:{numero_resultados:3, pagina: page + 1, pesquisa: filtro}}).then((res)=> {
        setArtistsNext(typeData(res.data.artistas, "artist"))
      })
      await axiosFest.get("/evento/listar", {params:{numero_resultados:3, pagina: page + 1, pesquisa: filtro}}).then((res)=> {
        setEventsNext(typeData(res.data.eventos, "event"))
      })
    }
  }

  useEffect(() => {
    getData()
  },[filtro, page])

  // page navigation controller
  const lastPage = eventsNext.length === 0 && artistsNext.length === 0;
  const singlePage = lastPage && page === 0;

  if(!(artists && events)) {
    return (
      <div className={"Search page"}>A carregar...</div>
    )
  }

  // return of first load and when filter is empty
  return (
    <div className={"Search page"}>
      <SearchBar setFilter={setFiltro} />
      {!filtro && <h1>Festivais</h1>}
      {!filtro &&
        (events.length === 0 ? (
          <p>Sem eventos encontrados.</p>
        ) : (
          events.map((e) => (
            <ListItem key={e.id+"e"} imagem={e.imagem} title={e.designacao} line2={e.local} />
          ))
        ))}
      {!filtro && <h1>Artistas</h1>}
      {!filtro &&
        (artists.length === 0 ? (
          <p>Sem artistas encontrados.</p>
        ) : (
          artists.map((a) => (
            <ListItem key={a.id+"a"} round={true} imagem={a.imagem} title={a.nome} line2={"Artista"} />
          ))
        ))}
  
      {filtro &&
        searchResults.map((r) => {
          if (r.type === "event") return <ListItem key={r.id+"e"} imagem={r.imagem} title={r.designacao} line2={r.local} />;
          return <ListItem key={r.id+"a"} round={true} imagem={r.imagem} title={r.nome} line2={"Artista"} />;
        })}
      {filtro && searchResults.length === 0 && <p>Sem resultados encontrados.</p>}
    </div>
  );
  
}

export default Search
