import './Login.scss'
import Input from "../../components/Input/Input";
import loginIcon from "../../assets/icons/Login.svg";
import logo from "../../assets/logo.svg";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axiosFest from "../../services/axiosfest";

function Login() {
  const { setUserData, setFavorites } = useContext(UserContext);
  const history = useHistory();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const getFav = async(email) => {
    await axiosFest.get("/participante/favoritos/listar", {params: {participante: email}})
        .then((res) => {
          setFavorites(res.data.favoritos)
        }).catch((e)=>{
          console.log(e)
          setFavorites([])
        })
  }

  const onSubmit = (data) => {
    setUserData(data);
    getFav(data.email);
    history.push("/home");
  };

  return (
    <div className={"Login page"}>
      <img alt={"logo"} className={"logo"} src={logo} />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={"Nome"}
          type={"text"}
          name={"name"}
          control={control}
          rules={{ required: "Nome é obrigatório", minLength: { value: 3, message: "Nome deve ter pelo menos 3 caracteres" } }}
        />
        {errors.name && <div className="error">{errors.name.message}</div>}
        <Input
          label={"E-mail"}
          type={"email"}
          name={"email"}
          control={control}
          rules={{ required: "E-mail é obrigatório", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "E-mail não é válido" } }}
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
        <div className={"button-container"}>
          <button className={"submit"} type={"submit"}>
            <img alt={"login"} src={loginIcon} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
