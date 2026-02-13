import React from 'react'
import './PaywallOverlay.css'

export default function PaywallOverlay({ visible, onUnlock }) {
  if (!visible) return null

  const handleUnlock = () => {
    onUnlock?.()
  }

  return (
    <div className="paywall-overlay">
      <div className="paywall-overlay__sheet">
        <div className="paywall-overlay__content">
          {/* Show Details */}
          <div className="paywall-overlay__show-details">
            {/* Thumbnail */}
            <div className="paywall-overlay__thumbnail">
              <div className="paywall-overlay__thumbnail-placeholder" />
            </div>
          </div>

          {/* Main Content */}
          <div className="paywall-overlay__text-content">
            <h2 className="paywall-overlay__headline">Chapter 1 complete</h2>
            <p className="paywall-overlay__subtext">🔥 12,847 people loved this chapter</p>
          </div>

          {/* Actions */}
          <div className="paywall-overlay__actions">
            <button className="paywall-overlay__btn paywall-overlay__btn--primary" onClick={handleUnlock}>
              Unlock chapter 2 for $2.99
            </button>

            {/* Divider */}
            <div className="paywall-overlay__divider">
              <span className="paywall-overlay__divider-line" />
              <span className="paywall-overlay__divider-text">or</span>
              <span className="paywall-overlay__divider-line" />
            </div>

            {/* Share CTA */}
            <div className="paywall-overlay__share">
              <p className="paywall-overlay__share-title">Share with a friend.</p>
              <p className="paywall-overlay__share-desc">
                Unlock this chapter for free when they
                <br />
                watch 3 episodes of a show.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
