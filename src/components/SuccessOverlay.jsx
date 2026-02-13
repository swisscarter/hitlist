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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2c-5.52285 0-10 4.47715-10 10 0 5.52285 4.47715 10 10 10 5.52285 0 10-4.47715 10-10 0-5.52285-4.47715-10-10-10zm3.77396 8.13327c0.34973-0.42745 0.28673-1.05747-0.14072-1.4072-0.42745-0.34973-1.05747-0.28673-1.4072 0.14072l-3.80028 4.64479-1.21865-1.21866c-0.39052-0.39052-1.02369-0.39052-1.41422 0-0.39052 0.39053-0.39052 1.02369 0 1.41422l2 2c0.19978 0.19978 0.47474 0.30573 0.75692 0.29165 0.28218-0.01407 0.54523-0.14686 0.72415-0.36552l4.5-5.5z" fill="white"/>
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
