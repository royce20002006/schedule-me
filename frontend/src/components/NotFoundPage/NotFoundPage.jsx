import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
  const navigate = useNavigate()
  const goBack = (e) => {
    e.stopPropagation()
    e.preventDefault();
    navigate(-1)
  }

  return (
    <div >
      <button className="submit back-button" onClick={e => goBack(e)}>Back</button>
      <h1 className='middle'>404 Page Not Found</h1>
      
    </div>
  )
}
