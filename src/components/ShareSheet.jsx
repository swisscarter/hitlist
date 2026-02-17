import React from 'react'
import './ShareSheet.css'

export default function ShareSheet({ visible, onClose, onShareComplete }) {
  if (!visible) return null

  return (
    <div className="share-sheet" onClick={onClose}>
      <div className="share-sheet__panel" onClick={e => e.stopPropagation()}>
        {/* Top bar - episode info + close */}
        <div className="share-sheet__top">
          <div className="share-sheet__episode">
            <div className="share-sheet__thumbnail" />
            <div className="share-sheet__episode-info">
              <span className="share-sheet__show-title">The Ick</span>
              <span className="share-sheet__episode-name">EP15. When he has sisters</span>
              <span className="share-sheet__source">Hitlist</span>
            </div>
          </div>
          <button className="share-sheet__close" onClick={onClose}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M9 1L1 9" stroke="rgba(235,235,245,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="share-sheet__separator" />

        {/* Share to: People */}
        <div className="share-sheet__people">
          {/* AirDrop */}
          <div className="share-sheet__person">
            <div className="share-sheet__person-avatar share-sheet__person-avatar--airdrop">
              <svg width="42" height="40" viewBox="0 0 42 40" fill="none">
                <path d="M21 0C21 0 9 16 0 24C3 24 8 22 12 19C12 19 16 30 21 40C26 30 30 19 30 19C34 22 39 24 42 24C33 16 21 0 21 0Z" fill="url(#airdrop-g)"/>
                <defs>
                  <linearGradient id="airdrop-g" x1="21" y1="0" x2="21" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1f97f5"/>
                    <stop offset="1" stopColor="#007aff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="share-sheet__person-name">AirDrop</span>
          </div>

          {/* Jenna */}
          <div className="share-sheet__person share-sheet__person--wide">
            <div className="share-sheet__person-avatar-wrap">
              <div className="share-sheet__person-avatar" />
              <div className="share-sheet__person-badge">
                <MessagesBadge />
              </div>
            </div>
            <span className="share-sheet__person-name">Jenna</span>
          </div>

          {/* Group */}
          <div className="share-sheet__person share-sheet__person--wide">
            <div className="share-sheet__person-avatar-wrap">
              <div className="share-sheet__person-avatar share-sheet__person-avatar--group">
                <div className="share-sheet__group-circles">
                  <div className="share-sheet__group-circle share-sheet__group-circle--1" />
                  <div className="share-sheet__group-circle share-sheet__group-circle--2" />
                  <div className="share-sheet__group-circle share-sheet__group-circle--3" />
                </div>
              </div>
              <div className="share-sheet__person-badge">
                <MessagesBadge />
              </div>
            </div>
            <span className="share-sheet__person-name">Group</span>
            <span className="share-sheet__person-subtitle">2 People</span>
          </div>

          {/* Favour */}
          <div className="share-sheet__person share-sheet__person--wide">
            <div className="share-sheet__person-avatar-wrap">
              <div className="share-sheet__person-avatar" />
              <div className="share-sheet__person-badge">
                <FaceTimeBadge />
              </div>
            </div>
            <span className="share-sheet__person-name">Favour</span>
          </div>

          {/* Simon */}
          <div className="share-sheet__person share-sheet__person--wide">
            <div className="share-sheet__person-avatar-wrap">
              <div className="share-sheet__person-avatar" />
              <div className="share-sheet__person-badge" />
            </div>
            <span className="share-sheet__person-name">Simon</span>
          </div>
        </div>

        <div className="share-sheet__separator" />

        {/* Share to: Apps */}
        <div className="share-sheet__apps">
          {/* Messages */}
          <button className="share-sheet__app" onClick={onShareComplete}>
            <div className="share-sheet__app-icon share-sheet__app-icon--messages">
              <svg width="44" height="40" viewBox="0 0 44 40" fill="none">
                <path d="M22 2C11.51 2 3 8.82 3 17.12C3 21.44 5.26 25.34 8.84 28.12C8.44 30.82 6.84 33.32 5.34 34.72C4.94 35.12 5.14 35.82 5.74 35.82C9.34 35.82 12.34 34.22 14.24 32.82C15.94 33.22 17.94 33.52 20 33.52C20.68 33.52 21.34 33.48 22 33.42C22 33.42 22 33.12 22 32.22C22 24.22 30.5 18.22 39.5 17.72C39.16 17.52 39 17.32 39 17.12C39 8.82 32.49 2 22 2Z" fill="white"/>
              </svg>
            </div>
            <span className="share-sheet__app-name">Messages</span>
          </button>

          {/* Notes */}
          <button className="share-sheet__app">
            <div className="share-sheet__app-icon share-sheet__app-icon--notes">
              <div className="share-sheet__notes-lines">
                <div className="share-sheet__notes-line" />
                <div className="share-sheet__notes-line" />
                <div className="share-sheet__notes-line" />
              </div>
            </div>
            <span className="share-sheet__app-name">Notes</span>
          </button>

          {/* Reminders */}
          <button className="share-sheet__app">
            <div className="share-sheet__app-icon share-sheet__app-icon--reminders">
              <div className="share-sheet__reminders-content">
                <div className="share-sheet__reminders-row">
                  <div className="share-sheet__reminders-dot share-sheet__reminders-dot--blue" />
                  <div className="share-sheet__reminders-line" />
                </div>
                <div className="share-sheet__reminders-row">
                  <div className="share-sheet__reminders-dot share-sheet__reminders-dot--red" />
                  <div className="share-sheet__reminders-line" />
                </div>
                <div className="share-sheet__reminders-row">
                  <div className="share-sheet__reminders-dot share-sheet__reminders-dot--orange" />
                  <div className="share-sheet__reminders-line" />
                </div>
              </div>
            </div>
            <span className="share-sheet__app-name">Reminders</span>
          </button>

          {/* Mail */}
          <button className="share-sheet__app">
            <div className="share-sheet__app-icon share-sheet__app-icon--mail">
              <svg width="38" height="28" viewBox="0 0 38 28" fill="none">
                <rect x="0" y="3" width="38" height="22" rx="3" fill="#1480e4"/>
                <path d="M0 6L19 17L38 6" stroke="white" strokeWidth="2.5" fill="none"/>
                <path d="M0 5L19 16L38 5V3H0V5Z" fill="white" fillOpacity="0.95"/>
                <path d="M0 25L14 15" stroke="white" strokeWidth="0.5" strokeOpacity="0.3"/>
                <path d="M38 25L24 15" stroke="white" strokeWidth="0.5" strokeOpacity="0.3"/>
              </svg>
            </div>
            <span className="share-sheet__app-name">Mail</span>
          </button>
        </div>

        {/* Action rows */}
        <div className="share-sheet__action-rows">
          <button className="share-sheet__action-row">
            <span className="share-sheet__action-label">Copy Link</span>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 3H5C3.89543 3 3 3.89543 3 5V17C3 18.1046 3.89543 19 5 19H17C18.1046 19 19 18.1046 19 17V14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M11 3H19V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 3L11 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function MessagesBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="4.33" fill="#33db4f"/>
      <path d="M10 3.5C6.42 3.5 3.5 5.88 3.5 8.8C3.5 10.32 4.3 11.7 5.56 12.66C5.42 13.58 4.86 14.44 4.34 14.96C4.2 15.1 4.28 15.34 4.48 15.34C5.72 15.34 6.76 14.8 7.42 14.32C7.94 14.44 8.56 14.54 9.2 14.54C9.4 14.54 9.7 14.52 10 14.48C10 14.48 10 14.1 10 13.4C10 10.8 12.8 8.8 16 8.6C15.86 8.54 15.5 8.3 15.5 8.1C15.5 5.88 13.58 3.5 10 3.5Z" fill="white"/>
    </svg>
  )
}

function FaceTimeBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="4.33" fill="#45dc51"/>
      <path d="M4 7.5C4 6.67 4.67 6 5.5 6H11C11.83 6 12.5 6.67 12.5 7.5V12.5C12.5 13.33 11.83 14 11 14H5.5C4.67 14 4 13.33 4 12.5V7.5Z" fill="white"/>
      <path d="M13 9L16 7V13L13 11V9Z" fill="white"/>
    </svg>
  )
}
