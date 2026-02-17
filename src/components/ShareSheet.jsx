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
          <button className="share-sheet__person">
            <div className="share-sheet__person-avatar share-sheet__person-avatar--airdrop">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L22 17H6L14 3Z" fill="url(#airdrop-grad)" stroke="url(#airdrop-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="airdrop-grad" x1="14" y1="3" x2="14" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1f97f5"/>
                    <stop offset="1" stopColor="#007aff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="share-sheet__person-name">AirDrop</span>
          </button>

          {/* Jenna */}
          <button className="share-sheet__person">
            <div className="share-sheet__person-avatar" />
            <span className="share-sheet__person-name">Jenna</span>
          </button>

          {/* Group */}
          <button className="share-sheet__person">
            <div className="share-sheet__person-avatar share-sheet__person-avatar--group" />
            <span className="share-sheet__person-name">Group</span>
            <span className="share-sheet__person-subtitle">2 People</span>
          </button>

          {/* Favour */}
          <button className="share-sheet__person">
            <div className="share-sheet__person-avatar" />
            <span className="share-sheet__person-name">Favour</span>
          </button>

          {/* Simon */}
          <button className="share-sheet__person">
            <div className="share-sheet__person-avatar" />
            <span className="share-sheet__person-name">Simon</span>
          </button>
        </div>

        <div className="share-sheet__separator" />

        {/* Share to: Apps */}
        <div className="share-sheet__apps">
          {/* Messages - triggers share complete */}
          <button className="share-sheet__app" onClick={onShareComplete}>
            <div className="share-sheet__app-icon share-sheet__app-icon--messages">
              <svg width="30" height="28" viewBox="0 0 30 28" fill="none">
                <path d="M15 2C8.37 2 3 6.48 3 12c0 2.83 1.38 5.39 3.6 7.2-.2 1.8-1.1 3.4-2.1 4.3-.3.3-.1.8.3.8 2.6 0 4.7-1.1 6-2.1.9.2 2.1.3 3.2.3 6.63 0 12-4.48 12-10S21.63 2 15 2Z" fill="white"/>
              </svg>
            </div>
            <span className="share-sheet__app-name">Messages</span>
          </button>

          {/* Notes */}
          <button className="share-sheet__app">
            <div className="share-sheet__app-icon share-sheet__app-icon--notes">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 8H18M6 12H18M6 16H14" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="share-sheet__app-name">Notes</span>
          </button>

          {/* Reminders */}
          <button className="share-sheet__app">
            <div className="share-sheet__app-icon share-sheet__app-icon--reminders">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="4" fill="#1a6dfe"/>
                <circle cx="8" cy="16" r="4" fill="#f72e21"/>
                <circle cx="16" cy="8" r="4" fill="#fe9903"/>
              </svg>
            </div>
            <span className="share-sheet__app-name">Reminders</span>
          </button>

          {/* Mail */}
          <button className="share-sheet__app">
            <div className="share-sheet__app-icon share-sheet__app-icon--mail">
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                <rect x="1" y="1" width="24" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                <path d="M1 3L13 11L25 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="share-sheet__app-name">Mail</span>
          </button>
        </div>

        {/* Action rows */}
        <div className="share-sheet__action-rows">
          <button className="share-sheet__action-row">
            <span className="share-sheet__action-label">Copy Link</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 11.5L11 7.5M7.5 5L8.5 4C10.16 2.34 12.84 2.34 14.5 4C16.16 5.66 16.16 8.34 14.5 10L13.5 11M10.5 13L9.5 14C7.84 15.66 5.16 15.66 3.5 14C1.84 12.34 1.84 9.66 3.5 8L4.5 7" stroke="rgba(235,235,245,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
