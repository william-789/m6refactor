import React, { useState } from "react";
import axiosFest from "../services/axiosfest";

const UserContext = React.createContext({});

function UserProvider (props) {
  const [userData, setUserData] = useState({}) // {name: , email:}
  const [favorites, setFavorites] = useState([])

  function isLogged() {
    return !!(userData.name && userData.email)
  }

  function isFavorite(idEl, type) {
    return favorites.some((el) => el.id === idEl && el.tipo === type)
  }

  function toggleFavLocal(id, tipo) {
    if(isFavorite(id, tipo)) {
      const listWithoutEl = favorites.filter((el) => el.id !== id && el.tipo !== tipo)
      setFavorites(listWithoutEl)
    } else {
      setFavorites([...favorites, { id, tipo }])
    }
  }

  return <UserContext.Provider value={{userData,setUserData, isLogged, isFavorite, favorites,toggleFavLocal, setFavorites}}>
    {props.children}
  </UserContext.Provider>
}

export default UserProvider;
export { UserContext }
