import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import axiosFest from "../../services/axiosfest"
import Card from "../../components/Card/Card"
import Bar, {NoticeBar} from "../../components/Bar/Bar";
import ListItem from "../../components/List_Item/ListItem"
import ticket from "../../assets/icons/nav_ticket_active.svg"
import qrCode from "../../assets/icons/qr.svg"
import cashIcon from "../../assets/icons/cash.svg"
import Empty from "../../components/Empty/Empty";

function Tickets() {
  const { userData, isFavorite } = useContext(UserContext)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [cash, setCash] = useState(0)
  const [futureEvents, setFutureEvents] = useState(null)
  const [pastEvents, setPastEvents] = useState(null)
  const [pendingExist, setPendingExist] = useState(false)

  const getData = async() => {
    const { email } = userData
    await axiosFest.get("/participante/pagamentos/existem_pendentes", {params: {participante: email}})
      .then((res) => setPendingExist(res.data.existem_pendentes)).catch(e => console.log(e))
    await axiosFest.get("participante/bilhetes/listar", {params: {participante: email}})
    .then((res) => {
      setCurrentEvent(res.data.atuais[0])
      if(currentEvent) setCash(currentEvent.conta_cashless.valor_atual)
      setFutureEvents(res.data.futuros)
      setPastEvents(res.data.passados)
    }).catch((e) => {
        setCurrentEvent(undefined)
        setFutureEvents([])
        setPastEvents([])
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
      {pendingExist && <NoticeBar />}
      <h1>A decorrer</h1>
      {
        currentEvent ?
          (
            <>
              <Card bought={true} image={currentEvent.imagem_evento} title={currentEvent.evento} line2={currentEvent.data_evento.slice(0,10)} line3={currentEvent.local} path={`/festival/${currentEvent.id_evento}`}/>
              <Bar icon1={ticket} icon2={qrCode} text={"1 x Venda Final"} />
              <Bar icon1={cashIcon} text={"Saldo"} price={cash} />
            </>)
          : (<Empty item={"eventos a ocorrer"}/>)
      }
      <hr/>
      <h1>Em breve</h1>
      { futureEvents.length === 0 && <Empty item={"festivais futuros"}/> }
      {
        futureEvents.map((fe) =>
            <ListItem  image={fe.imagem_evento} title={fe.evento} line2={fe.data_evento.slice(0,10)} line3={fe.local} iconType={"ticket"} path={`/festival/${fe.id_evento}`} idEl={fe.id_evento} favType={"evento"} liked={isFavorite(fe.id_evento,"eventos")}/>
            )
      }
      <h1>Festivais passados</h1>
      { pastEvents.length === 0 && <Empty item={"festivais passados"}/> }
      {
        pastEvents.map((pe) =>
            <ListItem  image={pe.imagem_evento} title={pe.evento} line2={pe.data_evento.slice(0,10)} line3={pe.local} iconType={"info"} path={`/festival/${pe.id_evento}`} idEl={pe.id_evento} favType={"evento"} liked={isFavorite(pe.id_evento,"eventos")}/>
        )
      }
    </div>
  )
}

export default Tickets
