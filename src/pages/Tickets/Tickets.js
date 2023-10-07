import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import axiosFest from "../../services/axiosfest"
import Card from "../../components/Card/Card"
import Bar from "../../components/Bar/Bar";
import ListItem from "../../components/List_Item/ListItem"
import ticket from "../../assets/icons/nav_ticket_active.svg"
import qrCode from "../../assets/icons/qr.svg"
import cashIcon from "../../assets/icons/cash.svg"
import {Link} from "react-router-dom";

function Tickets() {
  const { userData, isFavorite } = useContext(UserContext)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [cash, setCash] = useState(0)
  const [futureEvents, setFutureEvents] = useState(null)
  const [pastEvents, setPastEvents] = useState(null)

  const getData = async() => {
    console.log("userData",userData)
    const { email } = userData
    console.log("email", email);
    await axiosFest.get("participante/bilhetes/listar", {params: {participante: email}})
    .then((res) => {
      console.log("data",res.data);
      setCurrentEvent(res.data.atuais[0])
      if(currentEvent) setCash(currentEvent.conta_cashless.valor_atual)
      setFutureEvents(res.data.futuros)
      setPastEvents(res.data.passados)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  if(!((currentEvent !== null) && futureEvents && pastEvents)) {
    return (
      <div className={"Tickets page"}>A carregar...</div>
    )
  }

  return (
    <div className={"Tickets page"}>
      <h1>A decorrer</h1>
      {
        currentEvent ?
          (
            <>
              <Card bought={true} image={currentEvent.imagem_evento} title={currentEvent.evento} line2={currentEvent.data_evento.slice(0,10)} line3={currentEvent.local}/>
              <Bar icon1={ticket} icon2={qrCode} text={"1 x Venda Final"} />
              <Bar icon1={cashIcon} text={"Saldo"} price={cash} />
            </>)
          : (<p>Sem eventos a ocorrer</p>)
      }
      <hr/>
      <h1>Em breve</h1>
      { futureEvents.length === 0 && <p>Sem festivais futuros</p> }
      {
        futureEvents.map((fe) =>
          <Link to={`/festival/${fe.id_evento}`}>
            <ListItem  image={fe.imagem_evento} title={fe.evento} line2={fe.data_evento.slice(0,10)} line3={fe.local} iconType={"ticket"}/>
          </Link>
            )
      }
      <h1>Festivais passados</h1>
      { pastEvents.length === 0 && <p>Sem festivais passados</p> }
      {
        pastEvents.map((pe) =>
          <Link to={`/festival/${pe.id_evento}`}>
            <ListItem  image={pe.imagem_evento} title={pe.evento} line2={pe.data_evento.slice(0,10)} line3={pe.local} iconType={"info"}/>
          </Link>
        )
      }
    </div>
  )
}

export default Tickets
