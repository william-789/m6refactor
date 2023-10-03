import './Input.scss'
function Input({label = "",type,name,setter,iconSrc, placeholder = ""}) {
  return (
    <div className={"container"}>
      {label && <label>{label}</label>}
      <div className={"Input"}>
        {iconSrc && <img alt={name} src={iconSrc}/>}
        <input type={type} name={name} id={name} onChange={(e)=>setter(e.target.value)} placeholder={placeholder ? placeholder : `Introduz o teu ${label.toLowerCase()}`}/>
      </div>
    </div>

  )
}

export default Input
