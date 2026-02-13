import React, { useState } from 'react'
import AppleSignInSheet from './AppleSignInSheet'
import './SignInOverlay.css'

export default function SignInOverlay({ visible }) {
  const [showAppleSignIn, setShowAppleSignIn] = useState(false)

  if (!visible) return null

  const handleAppleClick = () => {
    setShowAppleSignIn(true)
  }

  const handleAppleClose = () => {
    setShowAppleSignIn(false)
  }

  return (
    <div className="signin-overlay">
      <div className="signin-overlay__sheet">
        <div className="signin-overlay__content">
          {/* Brand */}
          <span className="signin-overlay__brand">Hitlist</span>

          {/* Main Content */}
          <div className="signin-overlay__text-content">
            <h2 className="signin-overlay__headline">Keep watching, anytime.</h2>
            <p className="signin-overlay__description">
              Create an account save your progress, enjoy automatic episode playback, and continue watching anytime.
            </p>
          </div>

          {/* Actions */}
          <div className="signin-overlay__actions">
            <button className="signin-overlay__btn signin-overlay__btn--primary" onClick={handleAppleClick}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.0133 5.58667C12.9067 5.66 11.4533 6.48 11.4533 8.30667C11.4533 10.4267 13.3067 11.1733 13.36 11.1867C13.3533 11.2533 13.0533 12.2533 12.3467 13.28C11.72 14.1867 11.0667 15.0933 10.08 15.0933C9.09333 15.0933 8.82667 14.5067 7.68 14.5067C6.56 14.5067 6.16 15.1067 5.25333 15.1067C4.34667 15.1067 3.72 14.2533 2.98667 13.2267C2.13333 12.0133 1.44 10.1333 1.44 8.34667C1.44 5.34667 3.44 3.76 5.41333 3.76C6.37333 3.76 7.18667 4.4 7.8 4.4C8.38667 4.4 9.29333 3.72 10.4 3.72C10.8267 3.72 12.28 3.76 13.0133 5.58667ZM10.0533 2.45333C10.5333 1.88 10.8667 1.09333 10.8667 0.306667C10.8667 0.2 10.86 0.0933333 10.8467 0C10.06 0.0266667 9.12 0.52 8.56 1.17333C8.12 1.68 7.70667 2.46667 7.70667 3.26667C7.70667 3.38667 7.72667 3.50667 7.73333 3.54667C7.78667 3.55333 7.87333 3.56667 7.96 3.56667C8.66667 3.56667 9.54667 3.09333 10.0533 2.45333Z" fill="black"/>
              </svg>
              Continue with Apple
            </button>
            <button className="signin-overlay__btn signin-overlay__btn--secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.12 10.64 11.5564 11.4836 10.7055 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z" fill="#4285F4"/>
                <path d="M8 16C10.16 16 11.9709 15.2836 13.2945 14.0655L10.7055 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z" fill="#34A853"/>
                <path d="M3.52 9.52C3.36 9.04 3.26909 8.53091 3.26909 8C3.26909 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L3.52 9.52Z" fill="#FBBC05"/>
                <path d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.1527 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>

      {/* Apple Sign In Sheet */}
      <AppleSignInSheet visible={showAppleSignIn} onClose={handleAppleClose} />
    </div>
  )
}
