import axiosfest from "../../services/axiosfest";
import {useEffect, useState} from "react";
function Home() {
  const [art,setArt] = useState(null)

  useEffect(()=>{
    axiosfest.get("/artistas/211/detalhes").then((res)=>console.log(res.data)).catch(e => console.log(e))
  })
  return (
    <div className={"Home page"}>Home</div>
  )
}

export default Home
