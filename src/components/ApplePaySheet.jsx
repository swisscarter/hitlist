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
                <svg width="36" height="38" viewBox="0 0 36 40" fill="none">
                  <path d="M30.92 10.32c-0.76 0-1.14-0.39-1.14-1.18l0-4.06c0-0.9-0.24-1.59-0.72-2.06-0.47-0.48-1.15-0.72-2.04-0.72l-4.15 0c-0.77 0-1.16-0.39-1.16-1.16 0-0.76 0.39-1.14 1.16-1.14l4.18 0c3.35 0 5.03 1.65 5.03 4.96l0 4.18c0 0.79-0.39 1.18-1.16 1.18z m-29.78 0c-0.76 0-1.14-0.39-1.14-1.18l0-4.18c0-3.3 1.68-4.96 5.03-4.96l4.18 0c0.77 0 1.16 0.38 1.16 1.14 0 0.38-0.11 0.66-0.32 0.86-0.2 0.2-0.48 0.3-0.84 0.3l-4.15 0c-0.9 0-1.59 0.23-2.06 0.7-0.47 0.47-0.7 1.16-0.7 2.07l0 4.06c0 0.79-0.39 1.18-1.16 1.18z m13.55 8.37c-0.79 0-1.18-0.33-1.18-0.98 0-0.26 0.09-0.47 0.26-0.65 0.18-0.19 0.4-0.28 0.67-0.28l0.56 0c0.26 0 0.39-0.12 0.39-0.37l0-5.34c0-0.29 0.08-0.52 0.25-0.69 0.18-0.18 0.41-0.26 0.7-0.26 0.29 0 0.52 0.09 0.69 0.26 0.16 0.16 0.25 0.39 0.25 0.69l0 5.19c0 1.63-0.81 2.44-2.44 2.44l-0.14 0z m-4.9-3.88c-0.34 0-0.62-0.11-0.84-0.33-0.22-0.22-0.33-0.52-0.33-0.88l0-2.25c0-0.35 0.11-0.64 0.33-0.86 0.22-0.23 0.5-0.35 0.84-0.35 0.36 0 0.66 0.11 0.88 0.33 0.22 0.22 0.33 0.52 0.33 0.88l0 2.25c0 0.36-0.11 0.66-0.33 0.88-0.22 0.22-0.52 0.33-0.88 0.33z m13.25-0.33c-0.22 0.22-0.51 0.33-0.86 0.33-0.35 0-0.64-0.11-0.86-0.33-0.22-0.22-0.33-0.52-0.33-0.88l0-2.25c0-0.36 0.11-0.66 0.33-0.88 0.22-0.22 0.51-0.33 0.86-0.33 0.35 0 0.64 0.12 0.86 0.35 0.22 0.22 0.33 0.51 0.33 0.86l0 2.25c0 0.36-0.11 0.66-0.33 0.88z m-7.12 9.67c-1.01 0-1.99-0.19-2.94-0.58-0.95-0.4-1.75-0.96-2.41-1.69-0.2-0.22-0.3-0.46-0.3-0.7 0-0.27 0.09-0.49 0.26-0.65 0.19-0.18 0.42-0.26 0.69-0.26 0.28 0 0.54 0.13 0.79 0.4 0.5 0.49 1.1 0.88 1.79 1.18 0.69 0.29 1.39 0.44 2.11 0.44 0.74 0 1.45-0.15 2.14-0.44 0.7-0.3 1.29-0.7 1.76-1.18 0.26-0.27 0.52-0.4 0.79-0.4 0.27 0 0.49 0.09 0.67 0.26 0.18 0.16 0.26 0.38 0.26 0.65 0 0.28-0.09 0.52-0.26 0.72-0.71 0.71-1.55 1.27-2.5 1.67-0.94 0.39-1.89 0.58-2.87 0.58z m-10.9 7.95c-3.35 0-5.03-1.66-5.03-4.97l0-4.18c0-0.79 0.38-1.18 1.14-1.18 0.38 0 0.66 0.11 0.86 0.32 0.2 0.2 0.3 0.49 0.3 0.86l0 4.06c0 0.91 0.23 1.61 0.7 2.07 0.47 0.48 1.15 0.72 2.06 0.72l4.15 0c0.77 0 1.16 0.38 1.16 1.14 0 0.38-0.11 0.66-0.32 0.86-0.2 0.2-0.48 0.3-0.84 0.3l-4.18 0z m17.84 0c-0.77 0-1.16-0.39-1.16-1.16 0-0.76 0.39-1.14 1.16-1.14l4.15 0c0.89 0 1.57-0.24 2.04-0.72 0.48-0.47 0.72-1.16 0.72-2.07l0-4.06c0-0.79 0.38-1.18 1.14-1.18 0.38 0 0.66 0.11 0.86 0.32 0.2 0.2 0.3 0.49 0.3 0.86l0 4.18c0 3.32-1.68 4.97-5.03 4.97l-4.18 0z" fill="#3B82F7"/>
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
