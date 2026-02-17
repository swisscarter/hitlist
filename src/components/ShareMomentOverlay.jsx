import React from 'react'
import './ShareMomentOverlay.css'

export default function ShareMomentOverlay({ visible, onContinue }) {
  if (!visible) return null

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Ick',
          text: 'Check out The Ick!',
          url: window.location.href
        })
      } catch (e) {
        // User cancelled or share failed silently
      }
    }
  }

  return (
    <div className="share-moment-overlay">
      <div className="share-moment-overlay__sheet">
        <div className="share-moment-overlay__content">
          {/* Message */}
          <div className="share-moment-overlay__text-content">
            <h2 className="share-moment-overlay__headline">
              Continue to Chapter 3{'\n'}of 'The Ick'?
            </h2>
          </div>

          {/* Actions */}
          <div className="share-moment-overlay__actions">
            <button
              className="share-moment-overlay__cta share-moment-overlay__cta--primary"
              onClick={onContinue}
            >
              Continue watching
            </button>
            <button
              className="share-moment-overlay__cta share-moment-overlay__cta--secondary"
              onClick={handleShare}
            >
              Share a moment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
