import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosFest from "../../services/axiosfest";
import Card from "../../components/Card/Card";
import Bar from "../../components/Bar/Bar";
import ticket from "../../assets/icons/nav_ticket_active.svg";
import qrCode from "../../assets/icons/qr.svg";
import cashIcon from "../../assets/icons/cash.svg";

function Home() {
  const { userData, isFavorite } = useContext(UserContext)
  const { name } = userData
  const [currentEvent, setCurrentEvent] = useState(null)
  const [cash, setCash] = useState(0)
  const [futureEvents, setFutureEvents] = useState(null)
  
  async function getPrices(events) {
    const eventsWithPrice = await Promise.all(
      events.map(async (e) => {
        let price = "Esgotado";
        await axiosFest.get(`/evento/${e.id}/series_bilhetes/listar`)
          .then(res=> {
            for(const ticket of res.data.series) {
              if(ticket.disponivel) {
                price = ticket.custo;
                break;
              }
            }
          })
        return {
          ...e,
          preco_desde: price
        }
      })
    )
    return eventsWithPrice;
  }
  const getData = async() => {
    const { email } = userData
    await axiosFest.get("participante/bilhetes/listar", {params: {participante: email}})
      .then((res) => {
        setCurrentEvent(res.data.atuais[0])
        if(currentEvent) setCash(currentEvent.conta_cashless.valor_atual)
      })
    await axiosFest.get("/evento/listar",
      {params:{
        apenas_futuros: 1,
        numero_resultados: 3,
        pagina: 0
      }}).then(async (res)=> {
        const pricedEvents = await getPrices(res.data.eventos)
        setFutureEvents(pricedEvents);
      })
  }
  useEffect(()=>{
    getData();
  }, [])
  
  if(!(currentEvent !== null && futureEvents)) {
    return (
      <div className={"Home page"}>A carregar...</div>
    )
  }
  return (
    <div className={"Home page"}>
      <h1>Bom dia, {name}!</h1>
      {
        currentEvent &&
          (
            <>
              <Card bought={true} image={currentEvent.imagem_evento} title={currentEvent.evento} line2={currentEvent.data_evento.slice(0,10)} line3={currentEvent.local} path={`/festival/${currentEvent.id_evento}`}/>
              <Bar icon1={ticket} icon2={qrCode} text={"1 x Venda Final"} />
              <Bar icon1={cashIcon} text={"Saldo"} price={cash} />
            </>)
      }
      <h1>Sugestões</h1>
      {
        futureEvents.map((e)=> (
            <Card image={e.imagem} title={e.designacao} line2={e.data.slice(0,10)} line3={e.local} price={e.preco_desde} path={`/festival/${e.id}`}/>
        ))
      }
    </div>
  )
}

export default Home
