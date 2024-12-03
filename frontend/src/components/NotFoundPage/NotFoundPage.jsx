import { useNavigate } from "react-router-dom"
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
      <DotLottieReact
      className="wide"
      src="https://lottie.host/2ee4429c-8dfb-4489-b7bf-0ebb9758aabe/p6DqsZPXqn.lottie"
      loop
      autoplay
    />
      
    </div>
  )
}
