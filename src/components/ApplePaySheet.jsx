import React, { useState, useEffect } from 'react'
import './ApplePaySheet.css'

export default function ApplePaySheet({ visible, onClose, onComplete }) {
  const [state, setState] = useState('pay') // 'pay' | 'processing' | 'done'

  // Reset state when sheet becomes visible
  useEffect(() => {
    if (visible) {
      setState('pay')
    }
  }, [visible])

  if (!visible) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && state === 'pay') {
      onClose()
    }
  }

  const handlePayClick = () => {
    // Move to processing state
    setState('processing')
    
    // After 3 seconds, move to done state
    setTimeout(() => {
      setState('done')
      
      // After 2 more seconds, complete and dismiss
      setTimeout(() => {
        onComplete?.()
      }, 2000)
    }, 3000)
  }

  return (
    <div className="applepay-overlay" onClick={handleOverlayClick}>
      <div className="applepay-sheet">
        {/* Header */}
        <div className="applepay-sheet__header">
          {/* Apple Pay Logo */}
          <svg className="applepay-sheet__logo" width="63" height="26" viewBox="0 0 63 26" fill="none">
            <path d="M11.7 3.4C12.4 2.5 12.9 1.3 12.8 0C11.7 0.1 10.4 0.7 9.7 1.6C9 2.4 8.4 3.6 8.5 4.8C9.7 4.9 10.9 4.2 11.7 3.4ZM12.8 5C10.9 4.9 9.3 6 8.4 6C7.5 6 6.1 5.1 4.6 5.1C2.6 5.1 0.8 6.1 0 7.8C-1.7 11.2 -0.5 16.2 1.2 18.9C2 20.2 3 21.7 4.4 21.6C5.8 21.6 6.4 20.7 8.1 20.7C9.9 20.7 10.4 21.6 11.9 21.6C13.4 21.6 14.3 20.3 15.1 19C16 17.5 16.4 16.1 16.4 16C16.4 16 13.6 14.9 13.5 11.6C13.5 8.8 15.7 7.5 15.8 7.4C14.5 5.5 12.5 5.1 12.8 5Z" fill="black"/>
            <path d="M24.8 21.4V0.7H32.1C36.3 0.7 39.2 3.5 39.2 7.7C39.2 11.9 36.2 14.7 31.9 14.7H28.4V21.4H24.8ZM28.4 3.8V11.6H31.2C34 11.6 35.5 10.1 35.5 7.7C35.5 5.3 34 3.8 31.2 3.8H28.4Z" fill="black"/>
            <path d="M40.5 17.1C40.5 14.4 42.5 12.7 46.1 12.5L50.2 12.3V11.1C50.2 9.4 49.1 8.4 47.2 8.4C45.5 8.4 44.3 9.2 44 10.5H40.8C41 7.7 43.5 5.7 47.4 5.7C51.1 5.7 53.7 7.7 53.7 10.8V21.4H50.3V18.9H50.2C49.4 20.6 47.4 21.7 45.2 21.7C42.2 21.7 40.5 19.8 40.5 17.1ZM50.2 15.5V14.3L46.6 14.5C44.7 14.6 43.8 15.4 43.8 16.8C43.8 18.2 44.9 19.1 46.6 19.1C48.7 19.1 50.2 17.6 50.2 15.5Z" fill="black"/>
            <path d="M56.4 25.6V22.9C56.6 22.9 57.1 23 57.4 23C58.7 23 59.4 22.4 59.8 21.1L60 20.4L54.5 5.9H58.3L62 17.4H62.1L65.8 5.9H69.5L63.7 21.4C62.4 25 60.7 26 57.7 26C57.4 26 56.7 25.9 56.4 25.6Z" fill="black"/>
          </svg>
          
          {/* Close Button */}
          <button className="applepay-sheet__close" onClick={onClose} disabled={state !== 'pay'}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="#090909" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="applepay-sheet__options">
          {/* Apple Card */}
          <div className="applepay-sheet__card applepay-sheet__card--selected">
            <div className="applepay-sheet__card-icon">
              <div className="applepay-sheet__card-gradient" />
            </div>
            <span className="applepay-sheet__card-name">Apple Card</span>
            <span className="applepay-sheet__card-number">····1234</span>
            <svg className="applepay-sheet__card-chevron" width="11" height="17" viewBox="0 0 11 17" fill="none">
              <path d="M2.5 2L8.5 8.5L2.5 15" stroke="#d6d6d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Address */}
          <div className="applepay-sheet__card">
            <span className="applepay-sheet__card-address">Miami, Florida 33123</span>
            <svg className="applepay-sheet__card-chevron" width="11" height="17" viewBox="0 0 11 17" fill="none">
              <path d="M2.5 2L8.5 8.5L2.5 15" stroke="#d6d6d6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Bottom */}
        <div className="applepay-sheet__bottom">
          {/* Price */}
          <div className="applepay-sheet__price">
            <span className="applepay-sheet__price-label">'The Ick' chapter 2</span>
            <div className="applepay-sheet__price-amount">
              <span className="applepay-sheet__price-currency">$</span>
              <span className="applepay-sheet__price-value">2.99</span>
            </div>
          </div>

          {/* State Indicator */}
          <div className="applepay-sheet__state" onClick={state === 'pay' ? handlePayClick : undefined}>
            {/* Icon */}
            <div className="applepay-sheet__state-icon">
              {state === 'pay' && (
                <svg width="36" height="38" viewBox="0 0 36 38" fill="none">
                  <path d="M18 0C18 0 36 8 36 19C36 30 18 38 18 38C18 38 0 30 0 19C0 8 18 0 18 0Z" fill="#3B82F7"/>
                  <path d="M18 8L18 30M12 15L18 8L24 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {state === 'processing' && (
                <div className="applepay-sheet__spinner" />
              )}
              {state === 'done' && (
                <div className="applepay-sheet__done">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="17" stroke="#3B82F7" strokeWidth="2"/>
                    <path d="M12 19L17 24L26 15" stroke="#3B82F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Label */}
            <span className="applepay-sheet__state-label">
              {state === 'pay' && 'Pay with Face ID'}
              {state === 'processing' && 'Processing'}
              {state === 'done' && 'Done'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
