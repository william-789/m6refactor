import "./Modal.scss"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ticketIconAvailable from "../../assets/icons/nav_ticket_active.svg";
import { Pill } from "../List_Item/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import DataDisplay from "../dataDisplay/DataDisplay";


function Modal({event, open, setOpen, ...props}) {
  console.log("props modal",props)
  const { userData } = useContext(UserContext)
  return (
    <div className={`Modal-bg ${!open ? "closed" : ''}`}>
      <div className={"Modal"}>
        <h1>Confirmação</h1>
        <Pill image={ticketIconAvailable} {...props}/>
        <p>{`Estás a comprar um bilhete para o festival ${event}. Verifica os teus dados e
        clica em "Confirmar" para gerar uma referência de pagamento.`}</p>
        <DataDisplay leftTextList={["Nome", "E-mail"]} rightTextList={[userData.name, userData.email]} noBG={true} />
        <div className={"options-container"}>
          <div className={"confirm option"}>
            <FontAwesomeIcon icon={faCheck} />
            <p>Confirmar</p>
          </div>
          <div className={"close option"}>
            <FontAwesomeIcon onClick={()=>{setOpen(false)}} icon={faXmark} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
