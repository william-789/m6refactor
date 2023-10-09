import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import axiosFest from "../../services/axiosfest";
import { useContext, useEffect, useState } from "react";
import ListItem, {Pill} from "../../components/List_Item/ListItem";
import { UserContext } from "../../context/UserContext";
import ticketIcon from "../../assets/icons/ticket.svg";
import ticketIconAvailable from "../../assets/icons/nav_ticket_active.svg";
import Modal from "../../components/Modal/Modal";

function Festival() {
  const { id_festival } = useParams()
  const { isFavorite } = useContext(UserContext)
  const [details,setDetails] = useState(null)
  const [shows, setShows] = useState(null)
  const [tickets, setTickets] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [ticketModal, setTicketModal] = useState({})

  const getData = async  () => {
    await axiosFest.get(`/evento/${id_festival}/detalhes`)
        .then((res)=> {
          setDetails(res.data.evento)
        })
    await axiosFest.get(`/evento/${id_festival}/concertos/listar`,
      {params:
          {pagina: 0,
            numero_resultados: 3
          }})
      .then(res=> setShows(res.data.concertos))
    await axiosFest.get(`/evento/${id_festival}/series_bilhetes/listar`)
      .then((res)=> {
        setTickets(res.data.series)
        console.log(res.data.series)
      })
  }

  useEffect(() => {
    getData();
  }, []);

  if(!(details && shows && tickets)) {
    return(
      <div className={"Festival page"}>A carregar</div>
    )
  }

  return(
    <div className={"Festival page"}>
      <Card clear={true} image={details.imagem} liked={isFavorite(details.id,"evento")} favType={"evento"} idEl={id_festival}/>
      <div>
        <h1>{details.designacao}</h1>
        <span>{details.data.slice(0,10)}</span>
        <p>{details.local}</p>
      </div>
      <hr/>
      <h1>Concertos</h1>
      {
        shows.map((s)=>
        <ListItem key={s.id+"s"} image={s.imagem} title={s.artista} line2={s.data_hora_inicio.slice(0,10)} line3={s.palco} path={`/artist/${s.artista_id}`} idEl={s.artista_id} favType={"artist"} liked={isFavorite(s.artista_id,"artista")}/>
        )
      }
      <hr/>
      <h1>Informações</h1>
      <p>{details.descricao}</p>
      <hr/>
      <h1>Bilhetes</h1>
      {
        tickets.map((t)=>
          <Pill key={t.id+"t"} image={t.disponivel ? ticketIconAvailable : ticketIcon} title={t.designacao} line2={t.disponivel ? t.limite_vendas.slice(0,10) :"Indisponível"} price={t.custo} available={t.disponivel} openModal={setModalOpen} passData={setTicketModal}/>
        )
      }
      <Modal event={details.designacao} open={modalOpen} setOpen={setModalOpen} {...ticketModal} />
    </div>
  )
}

export default Festival
