import React, { useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [dismissing, setDismissing] = useState(false)

  const handleComplete = () => {
    setDismissing(true)
    setTimeout(() => {
      onComplete?.()
    }, 500)
  }

  return (
    <div className={`splash-screen ${dismissing ? 'splash-screen--dismissing' : ''}`}>
      <DotLottieReact
        src="/hitlistlogo.lottie"
        autoplay
        loop={false}
        onComplete={handleComplete}
        className="splash-screen__animation"
      />
    </div>
  )
}
