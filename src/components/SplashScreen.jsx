import React, { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [dotLottie, setDotLottie] = useState(null)
  const [dismissing, setDismissing] = useState(false)

  useEffect(() => {
    if (!dotLottie) return

    const handleComplete = () => {
      setDismissing(true)
      setTimeout(() => {
        onComplete?.()
      }, 500)
    }

    dotLottie.addEventListener('complete', handleComplete)
    return () => {
      dotLottie.removeEventListener('complete', handleComplete)
    }
  }, [dotLottie, onComplete])

  return (
    <div className={`splash-screen ${dismissing ? 'splash-screen--dismissing' : ''}`}>
      <DotLottieReact
        src="/hitlistlogo.lottie"
        autoplay
        loop={false}
        dotLottieRefCallback={setDotLottie}
        className="splash-screen__animation"
      />
    </div>
  )
}
