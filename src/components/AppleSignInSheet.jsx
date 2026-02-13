import React from 'react'
import './AppleSignInSheet.css'

export default function AppleSignInSheet({ visible, onClose }) {
  if (!visible) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="apple-signin" onClick={handleOverlayClick}>
      <div className="apple-signin__sheet">
        {/* Header */}
        <div className="apple-signin__header">
          <span className="apple-signin__title">Apple ID</span>
          <button className="apple-signin__close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="apple-signin__content">
          {/* App Icon */}
          <div className="apple-signin__icon">
            <span className="apple-signin__icon-text">H</span>
          </div>

          {/* Description */}
          <p className="apple-signin__description">
            Do you want to sign in to Hitlist
            <br />
            using your Apple ID
            <br />
            "mayarose@icloud.com"
          </p>
        </div>

        {/* Continue Button */}
        <div className="apple-signin__action">
          <button className="apple-signin__continue">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
