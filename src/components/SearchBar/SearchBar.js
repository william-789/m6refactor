import "./SearchBar.scss"
import searchIcon from "../../assets/icons/nav_search.svg";
function SearchBar({setFilter}) {
  return (
    <div className="search-bar bar">
      <div className={"search-box"}>
        <button id="search-button">
          <img alt="search button" src={searchIcon} />
        </button>
        <input type="text" id="input" placeholder="Encontra um festival ou artista" onChange={(e)=>setFilter(e.target.value)} />
      </div>
    </div>
  )
}

export default SearchBar
