import React, { useState } from "react";

const UserContext = React.createContext({});

function UserProvider (props) {
  const [userData, setUserData] = useState({}) // {name: , email:}

  function isLogged() {
    return !!(userData.name && userData.email)
  }

  return <UserContext.Provider value={{userData,setUserData, isLogged}}>
    {props.children}
  </UserContext.Provider>
}

export default UserProvider;
export { UserContext }
