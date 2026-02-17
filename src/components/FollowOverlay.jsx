import React from 'react'
import './FollowOverlay.css'

export default function FollowOverlay({ visible, onDismiss }) {
  if (!visible) return null

  return (
    <div className="follow-overlay">
      <div className="follow-overlay__sheet">
        <div className="follow-overlay__content">
          {/* Thumbnail placeholder */}
          <div className="follow-overlay__thumbnail">
            <div className="follow-overlay__thumbnail-placeholder" />
          </div>

          {/* Message */}
          <div className="follow-overlay__message">
            <p>Follow 'The Ick' on TikTok for exclusive clips.</p>
          </div>

          {/* Actions */}
          <div className="follow-overlay__actions">
            <button className="follow-overlay__cta follow-overlay__cta--primary">
              <span>Follow on TikTok</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 6.5V4.5C11.5 3.67157 10.8284 3 10 3H9V0H11C13.2091 0 15 1.79086 15 4V6.5H11.5Z" fill="black"/>
                <path d="M9 3V8.5C9 10.1569 7.65685 11.5 6 11.5C4.34315 11.5 3 10.1569 3 8.5C3 6.84315 4.34315 5.5 6 5.5C6.35064 5.5 6.68722 5.5602 7 5.67157V3.08535C6.67689 3.02924 6.34247 3 6 3C2.68629 3 0 5.68629 0 9C0 12.3137 2.68629 15 6 15C9.31371 15 12 12.3137 12 9V6C12.8284 6 13.6066 6.17157 14.3033 6.47487C14.6104 6.60887 15 6.38684 15 6.05V3H12C10.3431 3 9 4.34315 9 6V3Z" fill="black"/>
              </svg>
            </button>
            <button 
              className="follow-overlay__cta follow-overlay__cta--secondary"
              onClick={onDismiss}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
