import "./Splashscreen.scss"
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg"
function Splashscreen() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setHidden(true)
      setTimeout(()=>{
        setRemoved(true)
      }, 500)
    }, 1500)
  },[])
  return (
    <div id="splash-screen" className={`${hidden ? 'hidden' : ''} ${removed ? 'removed' : ''}`}>
      <img alt={""} src={logo} />
        <p>Ligando os amplificadores</p>
    </div>
  )
}

export default Splashscreen
