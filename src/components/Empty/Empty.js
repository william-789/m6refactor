import logo from "../../assets/logo-white.svg"
import "./Empty.scss"
function Empty({item}) {
  return (
    <div className={"Empty"}>
      <img src={logo}/>
      <p>Sem {item}</p>
    </div>
  )
}

export default Empty