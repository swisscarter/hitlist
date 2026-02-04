import React from 'react'
import './BrowserFrame.css'

export default function BrowserFrame({ children }) {
  return (
    <div className="browser-frame" data-name="Browser-frame">
      {/* Status Bar */}
      <div className="browser-frame__status-bar" data-name="StatusBar">
        <div className="browser-frame__status-left" data-name="Left Side">
          <div className="browser-frame__time-container" data-name="_StatusBar-time">
            <span className="browser-frame__time">9:41</span>
          </div>
        </div>
        
        <div className="browser-frame__dynamic-island" data-name="Dynamic Island">
          <div className="browser-frame__dynamic-island-pill" data-name="StatusBar-dynamicIsland">
            <div className="browser-frame__truedepth-camera" data-name="TrueDepth camera" />
            <div className="browser-frame__facetime-camera" data-name="FaceTime camera" />
          </div>
        </div>
        
        <div className="browser-frame__status-right" data-name="Right Side">
          <div className="browser-frame__signal-wifi-battery" data-name="Signal, Wifi, Battery">
            {/* Mobile Signal Icon */}
            <svg 
              className="browser-frame__icon-signal" 
              width="18" 
              height="12" 
              viewBox="0 0 18 12" 
              fill="none"
              data-name="Icon / Mobile Signal"
            >
              <path 
                d="M10 3c0-0.55228 0.44772-1 1-1h1c0.55228 0 1 0.44772 1 1v8c0 0.55228-0.44772 1-1 1h-1c-0.55228 0-1-0.44772-1-1V3z M15 1c0-0.55228 0.44772-1 1-1h1c0.55228 0 1 0.44772 1 1v10c0 0.55228-0.44772 1-1 1h-1c-0.55228 0-1-0.44772-1-1V1z M5 6.5c0-0.55228 0.44772-1 1-1h1c0.55228 0 1 0.44772 1 1v4.5c0 0.55228-0.44772 1-1 1H6c-0.55228 0-1-0.44772-1-1V6.5z M0 9c0-0.55228 0.44772-1 1-1h1c0.55228 0 1 0.44772 1 1v2c0 0.55228-0.44772 1-1 1H1c-0.55228 0-1-0.44772-1-1V9z" 
                fill="currentColor"
              />
            </svg>
            
            {/* Battery Icon */}
            <div className="browser-frame__battery" data-name="_StatusBar-battery">
              <svg 
                className="browser-frame__battery-outline" 
                width="25" 
                height="13" 
                viewBox="0 0 25 13" 
                fill="none"
                data-name="Outline"
              >
                <rect 
                  x="0.5" 
                  y="0.5" 
                  width="22" 
                  height="11.33" 
                  rx="3" 
                  stroke="currentColor" 
                  strokeOpacity="0.35"
                />
              </svg>
              <svg 
                className="browser-frame__battery-end" 
                width="2" 
                height="5" 
                viewBox="0 0 2 5" 
                fill="none"
                data-name="Battery End"
              >
                <path 
                  d="M0 0v4c0.80473-0.33878 1.32804-1.12687 1.32804-2 0-0.87313-0.52331-1.66122-1.32804-2" 
                  fill="currentColor" 
                  fillOpacity="0.4"
                />
              </svg>
              <div className="browser-frame__battery-fill" data-name="Fill" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="browser-frame__content">
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="browser-frame__home-indicator" data-name="HomeIndicator">
        <div className="browser-frame__home-indicator-bar" data-name="Home Indicator" />
      </div>
    </div>
  )
}
