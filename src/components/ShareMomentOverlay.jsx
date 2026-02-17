import React, { useState } from 'react'
import ShareSheet from './ShareSheet'
import './ShareMomentOverlay.css'

export default function ShareMomentOverlay({ visible, onContinue }) {
  const [showShareSheet, setShowShareSheet] = useState(false)

  if (!visible) return null

  const handleShareClick = () => {
    setShowShareSheet(true)
  }

  const handleShareSheetClose = () => {
    setShowShareSheet(false)
  }

  const handleShareComplete = () => {
    setShowShareSheet(false)
    onContinue?.()
  }

  return (
    <div className="share-moment-overlay">
      {!showShareSheet && (
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
                onClick={handleShareClick}
              >
                Share a moment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Share Sheet */}
      <ShareSheet
        visible={showShareSheet}
        onClose={handleShareSheetClose}
        onShareComplete={handleShareComplete}
      />
    </div>
  )
}
