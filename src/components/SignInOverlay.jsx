import React from 'react'
import './SignInOverlay.css'

export default function SignInOverlay({ visible }) {
  if (!visible) return null

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
            <button className="signin-overlay__btn signin-overlay__btn--primary">
              Sign up to continue
            </button>
            <button className="signin-overlay__btn signin-overlay__btn--secondary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
