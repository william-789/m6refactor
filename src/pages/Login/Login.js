import './Login.scss'
import Input from "../../components/Input/Input";
import loginIcon from "../../assets/icons/Login.svg";
import logo from "../../assets/logo.svg";
import { UserContext } from "../../context/UserContext";
import {useContext, useState} from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const { setUserData, userData } = useContext(UserContext);
  const history = useHistory();

  return (
    <div className={"Login page"}>
      <img alt={"logo"} className={"logo"} src={logo}/>
      <Input label={"Nome"} type={"text"} name={"name"} setter={setName}/>
      <Input label={"E-mail"} type={"email"} name={"email"} setter={setEmail}/>
      <div className={"button-container"}>
        <button className={"submit"} type={"submit"} onClick={()=> {
          setUserData({nome, email})
          console.log("userData", userData)
          history.push("/search")
        }}>
          <img alt={"login"} src={loginIcon} onClick={()=>{}}/>
        </button>
      </div>
    </div>
  )
}

export default Login

// import './Login.scss'
// import { useForm, Controller } from "react-hook-form";
// import Input from "../../components/Input/Input";
// import loginIcon from "../../assets/icons/Login.svg";
// import logo from "../../assets/logo.svg";
// import { UserContext } from "../../context/UserContext";
// import { useContext } from "react";
// function Login() {
//   const { handleSubmit, register, formState, control , field, getFieldState: fieldState} = useForm();
//
//   const onSubmit = (data) => {
//     console.log("dados introduzidos", data);
//
//   }
//
//   const checkError = (field) => {
//     return formState.errors[field] ? "error" : ""
//   }
//
//   return <div className={"Login page"}>
//     <img alt={"logo"} className={"logo"} src={logo}/>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className={"form-group"}>
//         <Controller
//           name={"nome"}
//           control={control}
//           rules={{
//             required: "O nome é obrigatório preencher",
//             minLength: {
//               value: 3,
//               message: "O nome tem de ter pelo menos 3 caracteres"
//             },
//           }}
//           render={({field, fieldState}) => (
//             <Input label={"Nome"} className={checkError("nome")} />
//           )} />
//         <small>{formState.errors["nome"]?.message}</small>
//       </div>
//       <div className={"form-group"}>
//         <Input label={"E-mail"} className={checkError("email")} {...register("email", {
//           required: "O email é obrigatório preencher",
//           pattern: {
//             value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//             message: "O email não tem um formato válido"
//           }
//         })}/>
//         <small>{formState.errors["email"]?.message}</small>
//       </div>
//
//       <div className={"button-container"}>
//         <button className={"submit"} type={"submit"}>
//           <img alt={"login"} src={loginIcon} onClick={()=>{}}/>
//         </button>
//       </div>
//
//     </form>
//   </div>
// }
//
// export default Login;

