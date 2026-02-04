import React from 'react'
import './BrowserFrame.css'

export default function BrowserFrame({ children }) {
  return (
    <div className="browser-frame">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-bar__left">
          <span className="status-bar__time">9:41</span>
        </div>
        
        <div className="status-bar__center">
          {/* Dynamic Island - hidden by default */}
          <div className="status-bar__dynamic-island" />
        </div>
        
        <div className="status-bar__right">
          {/* Signal Icon */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
            <rect x="0" y="9" width="3" height="3" rx="0.5"/>
            <rect x="5" y="5.5" width="3" height="6.5" rx="0.5"/>
            <rect x="10" y="2" width="3" height="10" rx="0.5"/>
            <rect x="15" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          
          {/* Battery Icon */}
          <div className="battery">
            <div className="battery__outline">
              <div className="battery__fill" />
            </div>
            <div className="battery__cap" />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="browser-frame__content">
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="home-indicator">
        <div className="home-indicator__bar" />
      </div>
    </div>
  )
}
