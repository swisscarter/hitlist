import React from 'react'
import './VideoPlayer.css'

export default function VideoPlayer() {
  return (
    <div className="video-player">
      {/* Media Area with gradient overlay */}
      <div className="video-player__media">
        <div className="video-player__gradient" />
      </div>

      {/* Bottom Section */}
      <div className="video-player__bottom">
        {/* Info Section (Left) */}
        <div className="video-player__info">
          <div className="video-player__top-info">
            {/* Title */}
            <div className="video-player__title-row">
              <span className="video-player__title">Show Title</span>
            </div>
            
            {/* Metadata */}
            <div className="video-player__metadata">
              <span className="video-player__episode-name">Episode Name</span>
              <span className="video-player__dot">·</span>
              <div className="video-player__cta-badge">
                <span>EP 1</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section (Right) */}
        <div className="video-player__actions">
          {/* Like */}
          <div className="video-player__action">
            <div className="video-player__action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C12.75 21 21 16.75 21 11C21 7 18.5 5 16 5C13.5 5 12 6.5 12 6.5C12 6.5 10.5 5 8 5C5.5 5 3 7 3 11C3 16.75 11.25 21 12 21Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="video-player__action-count">246k</span>
          </div>

          {/* Comments */}
          <div className="video-player__action">
            <div className="video-player__action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.3416 3.29356 14.6147 3.81996 15.7585C3.92989 16.0 3.95619 16.268 3.87805 16.5191L3.08178 19.0775C2.72598 20.2207 3.78703 21.2995 4.93596 20.9627L7.62429 20.1747C7.86584 20.1039 8.12422 20.129 8.35431 20.2311C9.46875 20.7254 10.703 21 12 21Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="video-player__action-count">1.9k</span>
          </div>

          {/* Share */}
          <div className="video-player__action">
            <div className="video-player__action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 12L13 4V8.5C4.5 8.5 2 11.5 2 20C3.5 17 4.5 15.5 13 15.5V20L22 12Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* More Options */}
          <div className="video-player__action">
            <div className="video-player__action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="5" cy="12" r="2" fill="white"/>
                <circle cx="12" cy="12" r="2" fill="white"/>
                <circle cx="19" cy="12" r="2" fill="white"/>
              </svg>
            </div>
          </div>

          {/* Fullscreen */}
          <div className="video-player__action">
            <div className="video-player__action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 4H4V8M20 4H16M20 8V4M20 20V16M16 20H20M4 16V20H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="video-player__progress-bar">
        <div className="video-player__progress-fill" style={{ width: '18%' }} />
      </div>
    </div>
  )
}
