import React, { useState } from 'react'
import ApplePaySheet from './ApplePaySheet'
import SuccessOverlay from './SuccessOverlay'
import './PaywallOverlay.css'

export default function PaywallOverlay({ visible, onUnlock }) {
  const [showApplePay, setShowApplePay] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!visible) return null

  const handleUnlockClick = () => {
    setShowApplePay(true)
  }

  const handleApplePayClose = () => {
    setShowApplePay(false)
  }

  const handleApplePayComplete = () => {
    setShowApplePay(false)
    setShowSuccess(true)
  }

  const handleContinueWatching = () => {
    setShowSuccess(false)
    onUnlock?.()
  }

  return (
    <div className="paywall-overlay">
      {!showSuccess && (
        <div className="paywall-overlay__sheet">
          <div className="paywall-overlay__content">
            {/* Main Content */}
            <div className="paywall-overlay__text-content">
              <h2 className="paywall-overlay__headline">Think you knew them?<br />Not this side, yet.</h2>
              <p className="paywall-overlay__subtext">20 more episodes</p>
            </div>

            {/* Actions */}
            <div className="paywall-overlay__actions">
              <button className="paywall-overlay__btn paywall-overlay__btn--primary" onClick={handleUnlockClick}>
                Unlock The Ick for $2.99
              </button>

              {/* Divider */}
              <div className="paywall-overlay__divider">
                <span className="paywall-overlay__divider-line" />
                <span className="paywall-overlay__divider-text">or get access to all content</span>
                <span className="paywall-overlay__divider-line" />
              </div>

              {/* Subscribe CTA */}
              <button className="paywall-overlay__btn paywall-overlay__btn--secondary">
                Subscribe for $9.99/mo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apple Pay Sheet */}
      <ApplePaySheet 
        visible={showApplePay} 
        onClose={handleApplePayClose}
        onComplete={handleApplePayComplete}
      />

      {/* Success Overlay */}
      <SuccessOverlay 
        visible={showSuccess}
        onContinue={handleContinueWatching}
      />
    </div>
  )
}
