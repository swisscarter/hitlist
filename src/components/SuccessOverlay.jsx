import React from 'react'
import './SuccessOverlay.css'

export default function SuccessOverlay({ visible, onContinue }) {
  if (!visible) return null

  return (
    <div className="success-overlay">
      <div className="success-overlay__sheet">
        <div className="success-overlay__content">
          {/* Checkmark Icon */}
          <div className="success-overlay__icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="4"/>
              <path d="M15 24L21 30L33 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Text Content */}
          <div className="success-overlay__text-content">
            <h2 className="success-overlay__headline">Chapter 2 unlocked</h2>
            <p className="success-overlay__description">
              You can now watch all episodes
              <br />
              chapter 2 of 'The Ick.'
            </p>
          </div>

          {/* CTA */}
          <button className="success-overlay__btn" onClick={onContinue}>
            Continue watching
          </button>
        </div>
      </div>
    </div>
  )
}
