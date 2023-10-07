import "./Search.scss"
import axiosFest from "../../services/axiosfest";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListItem from "../../components/List_Item/ListItem";
import { useState, useEffect, useContext } from "react";
import Pagination from "../../components/Pagination/Pagination";
import {UserContext} from "../../context/UserContext";

function Search() {
  const { isFavorite } = useContext(UserContext)
  const [events, setEvents] = useState(null)
  const [artists, setArtists] = useState(null)
  const [eventsNext, setEventsNext] = useState([])
  const [artistsNext, setArtistsNext] = useState([])
  const [page, setPage] = useState(0)
  const [filtro, setFiltro] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [additionalRes, setAdditionalRes] = useState([])
  const [resModified, setResModified] = useState(false) // so that completeList only runs once per search

  function typeData(data, type) {
    return data.map((el) => {
      return {
        ...el,
      type
      }
    })
  }

  const getData = async () => {
    let combinedRes = []
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

    if(filtro) {
      await axiosFest.get("/artistas/listar", {params:{numero_resultados:3, pagina: page + 1, pesquisa: filtro}}).then((res)=> {
        setArtistsNext(typeData(res.data.artistas, "artist"))
      })
      await axiosFest.get("/evento/listar", {params:{numero_resultados:3, pagina: page + 1, pesquisa: filtro}}).then((res)=> {
        setEventsNext(typeData(res.data.eventos, "event"))
      })
    }

    if(additionalRes.length > 0) { // ensures results from the previous page don't show up again
      combinedRes = combinedRes.filter((el) => !additionalRes.includes(el))
    }

    setSearchResults(combinedRes)
  }

  useEffect(() => {
    setResModified(false)
    getData()
  },[filtro, page])

  useEffect(()=> {
    setPage(0)
  },[filtro])

  useEffect(() => {
    if (searchResults.length < 6 && !resModified) { // tries to complete search page to have 6 results total
      completeList(searchResults, setSearchResults, additionalRes, setAdditionalRes, [eventsNext, artistsNext], [setEventsNext, setArtistsNext], setResModified);
    }
  }, [searchResults]);

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
      {!filtro &&
        (events.length === 0 ? (
          <p>Sem eventos encontrados.</p>
        ) : (
          events.map((e) => (
              <ListItem key={e.id+"e"} image={e.imagem} title={e.designacao} line2={e.data.slice(0,10)} line3={e.local} el={e} idEl={e.id} favType={"event"} liked={isFavorite(e)} path={`/festival/${e.id}`}/>
          ))
        ))}
      {!filtro && <h1>Artistas</h1>}
      {!filtro &&
        (artists.length === 0 ? (
          <p>Sem artistas encontrados.</p>
        ) : (
          artists.map((a) => (
              <ListItem key={a.id+"a"} round={true} image={a.imagem} title={a.nome} line2={"Artista"} el={a} idEl={a.id} favType={"artist"} liked={isFavorite(a)} path={`/artist/${a.id}`}/>
          ))
        ))}
  
      {filtro &&
        searchResults.map((r) => {
          if (r.type === "event") 
          return (
            <ListItem key={r.id+"e"} image={r.imagem} title={r.designacao} line2={r.data.slice(0,10)} line3={r.local} el={r} idEl={r.id} favType={"event"} liked={isFavorite(r)} path={`/festival/${r.id}`}/>
          );
          
          return (
            <ListItem key={r.id+"a"} round={true} image={r.imagem} title={r.nome} line2={"Artista"} el={r} favType={"artist"} idEl={r.id} liked={isFavorite(r)} path={`/artist/${r.id}`}/>
         );
        })}
      {filtro && searchResults.length === 0 && <p>Sem resultados encontrados.</p>}
      {
        filtro && !singlePage && <Pagination page={page} setPage={setPage} lastPage={lastPage}/>
      }
    </div>
  );
  
}

export default Search

// Ensures the search page has 6 elements whenever possible
function completeList(targetList, targetModifier, additionalResults, setAdditionalResults, sourceLists, sourceChangers, changeTracker) {
  let currentSourceI = 0;
  const targetCopy = [...targetList]; 

  while (targetCopy.length < 6 && currentSourceI < sourceLists.length) {
    const currentSourceList = sourceLists[currentSourceI];
    const currentSourceListChanger = sourceChangers[currentSourceI]
    for (const el of currentSourceList) {
      currentSourceListChanger((prevStateList)=>prevStateList.filter(e => e !== el)) // removes el from the source array
      setAdditionalResults([...additionalResults, el]);
      targetCopy.push(el);
      if (targetCopy.length >= 6) {
        break;
      }
    }

    currentSourceI++;
  }
  targetModifier(targetCopy);
  changeTracker(true)
}
