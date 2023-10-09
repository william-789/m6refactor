import "./PopUp.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function PopUp({message, showMessage, setShowMessage}) {
  const bg = {
    backgroundColor: `${message.type === "error" ? "red" : "green"}`
  };

  useEffect(()=>{
    setTimeout(()=>{
      setShowMessage(false)
    },2000);
  }, [message])

  return(
    <div className={`PopUp ${showMessage ? "" : 'invisible'}`} style={bg}>
      <p>{message.text}</p>
      < FontAwesomeIcon icon={message.type === "error" ? faXmark : faCheck} />
    </div>
  )
}

export default PopUp
