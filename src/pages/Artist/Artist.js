import { useParams } from "react-router-dom";

function Artist() {
  const { id_artist } = useParams()

  return(
    <div>Artist {id_artist}</div>
  )
}

export default Artist