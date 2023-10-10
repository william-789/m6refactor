import Empty from "../../components/Empty/Empty";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosFest from "../../services/axiosfest";
import ListItem, {Pill} from "../../components/List_Item/ListItem";
import Pagination from "../../components/Pagination/Pagination";
import cardIcon from "../../assets/icons/card.svg"
import DataDisplay from "../../components/dataDisplay/DataDisplay";

function Profile() {
  const { userData } = useContext(UserContext)
  const { email } = userData;
  const [pageFav, setPageFav] = useState(0) // fav
  const [favProfile, setFavProfile] = useState(null)
  const [favoritesNext, setFavoritesNext] = useState([])
  const [pendingExist, setPendingExist] = useState(false) // payments
  const [pendingPayments, setPendingPayments] = useState(null) // pending
  const [pagePending, setPagePending] = useState(0)
  const [pendingNext, setPendingNext] = useState([])
  const [otherPayments, setOtherPayments] = useState(null) // others
  const [pageOthers, setPageOthers] = useState(0)
  const [otherNext, setOthersNext] = useState([])

  const getFavorites  = async () => {
    await axiosFest.get("/participante/favoritos/listar", {params: {participante: email, pagina: pageFav}})
      .then((res) => {
        setFavProfile(res.data.favoritos)
      }).catch((e)=>{
        console.log(e)
        setFavProfile([])
      })
    await axiosFest.get("/participante/favoritos/listar", {params: {participante: email, pagina: pageFav + 1}})
      .then((res) => {
        setFavoritesNext(res.data.favoritos)
      }).catch((e)=>{
        console.log(e)
        setFavProfile([])
      })
  }

  const getPending = async () => {
    await axiosFest.get("/participante/pagamentos/existem_pendentes", {params: {participante: email}})
      .then((res) => setPendingExist(res.data.existem_pendentes)).catch(e => console.log(e))
    await axiosFest.get("/participante/pagamentos/listar", {params: {
        participante: email,
        estado: "PAGAMENTO_PENDENTE", pagina: pagePending
      }}).then((res) => setPendingPayments(res.data.pagamentos)).catch(e => console.log(e))
    await axiosFest.get("/participante/pagamentos/listar", {params: {
        participante: email,
        estado: "PAGAMENTO_PENDENTE", pagina: pagePending + 1
      }}).then((res) => setPendingNext(res.data.pagamentos)).catch(e => console.log(e))
  }

  const getOtherPayments = async () => {
    await axiosFest.get("/participante/pagamentos/listar", {params: {
        participante: email,
        estado: "PAGO", pagina: pageOthers
      }}).then((res) => setOtherPayments(res.data.pagamentos)).catch(e => console.log(e))
    await axiosFest.get("/participante/pagamentos/listar", {params: {
        participante: email,
        estado: "PAGO", pagina: pageOthers + 1
      }}).then((res) => setOthersNext(res.data.pagamentos)).catch(e => console.log(e))
  }

  useEffect(()=>{
    getFavorites()
  }, [pageFav])
  useEffect(()=>{
    getPending()
  }, [pagePending])
  useEffect(()=>{
    getOtherPayments()
  }, [pageOthers])

  if(!(favProfile && pendingPayments && otherPayments)) {
    return (
      <div className={"Profile page"}>A carregar</div>
    )
  }

  // page navigation controller FAV
  const lastPageFav = favoritesNext.length === 0;
  const singlePageFav = lastPageFav && pageFav === 0;
  // page navigation controller PENDING
  const lastPagePending = pendingNext.length === 0;
  const singlePagePending = lastPagePending && pagePending === 0;
  // page navigation controller OTHERS
  const lastPageOthers = otherNext.length === 0;
  const singlePageOthers = lastPageOthers && pageOthers === 0;

  const noPayment = pendingPayments.length === 0 && otherPayments.length === 0;

  return (
    <div className={"Profile page"}>
      <h1>Favoritos</h1>
      {
        favProfile.length === 0 ? <Empty item={"favoritos"}/> :
          favProfile.slice(0,3).map((f)=>
          f.tipo === "evento" ?
            <ListItem key={f.id+"e"} image={f.imagem} title={f.nome} line2={f.data.slice(0,10)} line3={f.local} idEl={f.id} favType={"event"} liked={true} path={`/festival/${f.id}`}/>
            :
            <ListItem key={f.id+"a"} round={true} image={f.imagem} title={f.nome} line2={"Artista"} idEl={f.id} favType={"artist"} liked={true} path={`/artist/${f.id}`}/>
          )
      }
      {favProfile.length > 0 && !singlePageFav && <Pagination page={pageFav} setPage={setPageFav} lastPage={lastPageFav}/>}

      {noPayment ? <h1>Pagamentos</h1> : <h1>Pagamentos Pendentes</h1>}
      {noPayment && <Empty item={"pagamentos"}/>}
      {
        pendingPayments.length === 0 ? !noPayment && <Empty item={"pagamentos pendentes"}/> :
          pendingPayments.map((p) =>
            <>
              <Pill key={p.id} image={cardIcon} price={p.valor} title={"Pagamento"} line2={"Pendente"} line3={p.data_compra.slice(0,10)} pay={true} paid={false}/>
              <DataDisplay leftTextList={["Entidade", "Referência", "Valor"]} rightTextList={[p.entidade,p.referencia,p.valor]} paymentBoolean={true} />
            </>
          )
      }
      {pendingPayments.length > 0 && !singlePagePending && <Pagination page={pagePending} setPage={setPagePending} lastPage={lastPagePending}/>}

      {(pendingPayments.length > 0 || otherPayments.length > 0) && <h1>Outros Pagamentos</h1>}
      {
        otherPayments.length === 0 ? !noPayment && <Empty item={"outros pagamentos"}/> :
          otherPayments.map((p) =>
            <>
              <Pill key={p.id} image={cardIcon} price={p.valor} title={"Pagamento"} line2={"Completo"} line3={p.data_compra.slice(0,10)} pay={true} paid={true}/>
            </>
          )
      }
      {otherPayments.length > 0 && !singlePageOthers && <Pagination page={pageOthers} setPage={setPageOthers} lastPage={lastPageOthers}/>}

    </div>
  )
}

export default Profile
