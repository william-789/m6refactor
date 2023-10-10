import "./Cashless.scss"
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosFest from "../../services/axiosfest";
import { UserContext } from "../../context/UserContext";
import { MovementItem, Pill } from "../../components/List_Item/ListItem";
import cardIcon from "../../assets/icons/card.svg";
import bagIcon from "../../assets/icons/shopping_bag.svg";
import DataDisplay from "../../components/dataDisplay/DataDisplay";
import { useForm } from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../components/PopUp/PopUp";
import {NoticeBar} from "../../components/Bar/Bar";


function Cashless() {
  const { id_festival } = useParams()
  const { userData } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [saldo, setSaldo] = useState(0)
  const [extrato, setExtrato] = useState([])
  const [pedingPayments, setPendingPayments] = useState([]) // apenas carregamentos // sem paginação aqui :/
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [message, setMessage] = useState({}) // message ***
  const [showMessage, setShowMessage] = useState(false)

  const onSubmit = (data) => {
    axiosFest.post(`/cashless/${id_festival}/carregar`, {
      participante: userData.email,
      valor: data.carregamento
    }).then(()=>{
      setMessage({text: "Carregamento registado com sucesso, tens um novo pagamento pendente", type: "sucess"})
    }).catch((e)=>{
      setMessage({text: "Ocorreu um erro ao registar o carregamento!", type: "error"})
    }).then(()=> setShowMessage(true))
  };
  const getData = async () => {
    await axiosFest.get(`/cashless/${id_festival}/saldo`, {params: {participante: userData.email}})
      .then((res)=>setSaldo(res.data.saldo)).catch(e => console.log(e))
    await axiosFest.get(`/cashless/${id_festival}/extrato`, {params: {participante: userData.email}})
      .then((res)=> setExtrato(res.data.movimentos)).catch(e => console.log(e))
    await axiosFest.get(`/participante/pagamentos/listar`, {params:
        {
          participante: userData.email,
          tipo: "CARREGAMENTO",
          estado: "PAGAMENTO_PENDENTE",
          evento: id_festival
        }})
      .then((res)=>setPendingPayments(res.data.pagamentos)).catch(e => console.log(e))
    setLoading(false)
  }
  useEffect(()=>{

  },[])

  return (
    <div className={"Cashless page"}>
      <PopUp message={message} setShowMessage={setShowMessage} showMessage={showMessage}/>
      {pedingPayments.length > 0 && <NoticeBar />}
      <div className={"saldo"}>
        <span>{saldo.toFixed(2)} €</span>
        <p>Saldo Atual</p>
      </div>
      <h1>Efetuar carregamento</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="number"
            id="carregamento"
            step="0.01"
            inputMode="numeric"
            pattern="[0-9]*"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            {...register('carregamento', {
              min: { value: 1, message: 'Carregamento mínimo de 1EUR' },
            })}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {errors.carregamento && <p className={"error"}>{errors.carregamento.message}</p>}
      </form>
      {pedingPayments.length > 0 && <h1>Pagamentos pendentes</h1>}
      {
        pedingPayments.map((p) =>
            <>
              <Pill key={p.id} image={cardIcon} price={p.valor} title={"Pagamento"} line2={"Pendente"} line3={p.data_compra.slice(0,10)} pay={true} paid={false}/>
              <DataDisplay leftTextList={["Entidade", "Referência", "Valor"]} rightTextList={[p.entidade,p.referencia,p.valor]} paymentBoolean={true} />
            </>
        )
      }
      <h1>Movimentos</h1>
      {
        extrato.map((m) => {
          const gasto = m.tipo === "gasto";
          return <>
            <MovementItem icon={gasto ? bagIcon : cardIcon} saldo={m.saldo} data={m.data.slice(0,10)} hora={m.data.slice(11,16)} tipo={m.tipo} value={gasto ? m.valor_unitario * m.quantidade : m.valor} />
            {gasto && <DataDisplay leftTextList={[`${m.quantidade} x ${m.produto}`]} rightTextList={[`Valor unit. ${m.valor_unitario}`]}/>}
          </>
        })
      }
    </div>
  )
}

export default Cashless
