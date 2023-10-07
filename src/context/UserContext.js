import React, { useState } from "react";

const UserContext = React.createContext({});

function UserProvider (props) {
  const [userData, setUserData] = useState({}) // {name: , email:}
  const [favorites, setFavorites] = useState([])

  function isLogged() {
    return !!(userData.name && userData.email)
  }

  function isFavorite(el) {
    return favorites.includes(el)
  }

  function toggleFavLocal(el) {
    if(isFavorite(el)) {
      const listWithoutEl = favorites.filter((favEl) => favEl !== el)
      setFavorites(listWithoutEl)
    } else {
      setFavorites([...favorites, el])
    }
  }

  return <UserContext.Provider value={{userData,setUserData, isLogged, isFavorite, toggleFavLocal, setFavorites}}>
    {props.children}
  </UserContext.Provider>
}

export default UserProvider;
export { UserContext }
