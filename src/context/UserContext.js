import React, { useState } from "react";

const UserContext = React.createContext({});

function UserProvider (props) {
  const [userData, setUserData] = useState({}) // {name: , email:}
  const [favorites, setFavorites] = useState({})

  function isLogged() {
    return !!(userData.name && userData.email)
  }

  function isFavorite(idEl, type) {
    return favorites[type].includes(idEl)
  }

  function toggleFavLocal(id, tipo) {
    const updatedFavorites = { ...favorites }
    if(isFavorite(id, tipo)) {
      updatedFavorites[tipo] = updatedFavorites[tipo].filter((el) => el !== id);
    } else {
      updatedFavorites[tipo].push(id);
    }
    setFavorites(updatedFavorites)
  }

  return <UserContext.Provider value={{userData,setUserData, isLogged, isFavorite, favorites,toggleFavLocal, setFavorites}}>
    {props.children}
  </UserContext.Provider>
}

export default UserProvider;
export { UserContext }
