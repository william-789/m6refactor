import "./Navbar.scss"
import Option from "./Option";
import home from "../../assets/icons/nav_home.svg"
import search from "../../assets/icons/nav_search.svg";
import ticket from "../../assets/icons/ticket.svg";
import profile from "../../assets/icons/nav_user.svg";
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function Navbar() {
  const { isLogged } = React.useContext(UserContext);
  
  return isLogged() ? (
    <nav className={"Navbar"}>
      <div className={"nav-container"}>
        <Option path={"/home"} icon={home} name={"Home"}/>
        <Option path={"/search"} icon={search} name={"Search"}/>
        <Option path={"/tickets"} icon={ticket} name={"Ticket"}/>
        <Option path={"/profile"} icon={profile} name={"Profile"}/>
      </div>
    </nav>
  ) : null
}

export default Navbar
