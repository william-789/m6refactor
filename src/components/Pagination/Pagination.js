import "./Pagination.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({setPage, page, lastPage}) {
  return (
    <div className={"Pagination"}>
      <div onClick={() => setPage(page - 1)} className={page === 0 ? 'unactive' : ''}>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </div>
      <div onClick={() => setPage(page + 1)} className={lastPage ? 'unactive' : ''}>
        <FontAwesomeIcon icon={faArrowRight}/>
      </div>
    </div>
  )
}

export default Pagination