import React, { useState } from "react";

const UserContext = React.createContext({});

function UserProvider (props) {
  const [userData, setUserData] = useState({}) // {nome: , email:}

  function isLogged() {
    return !!(userData.nome && userData.email)
  }

  return <UserContext.Provider value={{userData,setUserData, isLogged}}>
    {props.children}
  </UserContext.Provider>
}

export default UserProvider;
export { UserContext }
