import { NavLink } from 'react-router-dom';

function Option({path, icon, name}) {
  return (
    <NavLink className="nav-option" to={path}>
      <img className="nav-icon" alt={name} src={icon} />
      <p>{name}</p>
    </NavLink>
  )
}

export default Option
