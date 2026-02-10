import React, { useState, useEffect, useCallback, useRef } from 'react'
import './VideoPlayer.css'

export default function VideoPlayer({ 
  src, 
  title = 'Show Title', 
  episode = 'Episode Name',
  likes = '246k',
  comments = '1.9k',
  episodeNum = 1,
  fit = 'contain',
  isExpanded,
  onToggleExpanded,
  controlsVisible,
  onShowControls,
  onHideControls,
  onVideoEnded,
  isActive
}) {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isSeeking, setIsSeeking] = useState(false)
  const videoRef = useRef(null)
  const hideTimeoutRef = useRef(null)
  const progressBarRef = useRef(null)

  // Handle active state - play/pause and restart based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.currentTime = 0 // Restart from beginning
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  // Update progress bar based on video time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration && !isSeeking) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener('timeupdate', updateProgress)
    return () => video.removeEventListener('timeupdate', updateProgress)
  }, [isSeeking])

  // Auto-hide controls when NOT expanded (minimal view)
  useEffect(() => {
    if (isExpanded || !controlsVisible) return

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    hideTimeoutRef.current = setTimeout(() => {
      onHideControls()
    }, 2000)

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [isExpanded, controlsVisible, onHideControls])

  // Handle tap to play/pause
  const handleTap = useCallback((e) => {
    // Don't toggle if clicking on controls
    if (e.target.closest('.video-player__bottom') || e.target.closest('.video-player__progress-bar')) {
      return
    }
    
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }

    // Show controls on tap when in minimal mode
    if (!isExpanded) {
      onShowControls()
    }
  }, [isExpanded, onShowControls])

  // Handle progress bar seeking
  const handleProgressBarClick = (e) => {
    const video = videoRef.current
    const progressBar = progressBarRef.current
    if (!video || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    
    video.currentTime = percentage * video.duration
    setProgress(percentage * 100)
  }

  const handleProgressBarDrag = (e) => {
    if (!isSeeking) return
    
    const video = videoRef.current
    const progressBar = progressBarRef.current
    if (!video || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
    const dragX = clientX - rect.left
    const percentage = Math.max(0, Math.min(1, dragX / rect.width))
    
    video.currentTime = percentage * video.duration
    setProgress(percentage * 100)
  }

  const handleDragStart = (e) => {
    e.preventDefault()
    setIsSeeking(true)
    handleProgressBarDrag(e)
  }

  const handleDragEnd = () => {
    setIsSeeking(false)
  }

  // Add global mouse/touch listeners for dragging
  useEffect(() => {
    if (!isSeeking) return

    const handleMove = (e) => handleProgressBarDrag(e)
    const handleUp = () => handleDragEnd()

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleUp)
    }
  }, [isSeeking])

  return (
    <div 
      className="video-player"
      onClick={handleTap}
    >
      {/* Media Area with video */}
      <div className="video-player__media">
        <video 
          ref={videoRef}
          className="video-player__video"
          style={{ objectFit: fit }}
          src={src}
          muted
          playsInline
          onEnded={onVideoEnded}
        />
      </div>

      {/* Bottom Section - starts with minimal view, expands to full */}
      {isExpanded ? (
        <ExpandedBottom 
          onCollapse={onToggleExpanded}
          title={title}
          episode={episode}
          likes={likes}
          comments={comments}
          episodeNum={episodeNum}
        />
      ) : (
        <MinimalBottom 
          onExpand={onToggleExpanded} 
          visible={controlsVisible}
          episodeNum={episodeNum}
        />
      )}

      {/* Progress Bar - draggable */}
      <div 
        ref={progressBarRef}
        className="video-player__progress-bar"
        onClick={handleProgressBarClick}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="video-player__progress-track">
          <div className="video-player__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

/* Minimal Bottom - default view with volume, episodes, CC, expand (auto-hides) */
function MinimalBottom({ onExpand, visible, episodeNum }) {
  const handleExpandClick = (e) => {
    e.stopPropagation()
    onExpand()
  }

  return (
    <div className={`video-player__bottom video-player__bottom--minimal ${visible ? '' : 'video-player__bottom--hidden'}`}>
      {/* Left - Volume */}
      <div className="video-player__fs-left">
        <div className="video-player__fs-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5.69722 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H5.69722C5.89464 16 6.08765 16.0584 6.25192 16.168L12 20V4L6.25192 7.83205C6.08765 7.94156 5.89464 8 5.69722 8Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Center - Episodes Badge */}
      <div className="video-player__fs-center">
        <div className="video-player__episodes-badge">
          <span>EP {episodeNum}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Right - CC and Expand */}
      <div className="video-player__fs-right">
        {/* Closed Captions */}
        <div className="video-player__fs-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M8.5 10.5C8.5 9.67157 9.17157 9 10 9C10.5 9 10.9 9.2 11.2 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8.5 13.5C8.5 14.3284 9.17157 15 10 15C10.5 15 10.9 14.8 11.2 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M13.5 10.5C13.5 9.67157 14.1716 9 15 9C15.5 9 15.9 9.2 16.2 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M13.5 13.5C13.5 14.3284 14.1716 15 15 15C15.5 15 15.9 14.8 16.2 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Expand */}
        <div className="video-player__fs-icon video-player__fs-icon--clickable" onClick={handleExpandClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 4H4V8M20 4H16M20 8V4M20 20V16M16 20H20M4 16V20H8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* Expanded Bottom - full view with info, likes, comments, etc. */
function ExpandedBottom({ onCollapse, title, episode, likes, comments, episodeNum }) {
  const handleCollapseClick = (e) => {
    e.stopPropagation()
    onCollapse()
  }

  return (
    <div className="video-player__bottom">
      {/* Info Section (Left) */}
      <div className="video-player__info">
        <div className="video-player__top-info">
          <div className="video-player__title-row">
            <span className="video-player__title">{title}</span>
          </div>
          <div className="video-player__metadata">
            <span className="video-player__episode-name">{episode}</span>
            <span className="video-player__dot">·</span>
            <div className="video-player__cta-badge">
              <span>EP {episodeNum}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Section (Right) */}
      <div className="video-player__actions">
        <div className="video-player__action">
          <div className="video-player__action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C12.75 21 21 16.75 21 11C21 7 18.5 5 16 5C13.5 5 12 6.5 12 6.5C12 6.5 10.5 5 8 5C5.5 5 3 7 3 11C3 16.75 11.25 21 12 21Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="video-player__action-count">{likes}</span>
        </div>

        <div className="video-player__action">
          <div className="video-player__action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.3416 3.29356 14.6147 3.81996 15.7585C3.92989 16 3.95619 16.268 3.87805 16.5191L3.08178 19.0775C2.72598 20.2207 3.78703 21.2995 4.93596 20.9627L7.62429 20.1747C7.86584 20.1039 8.12422 20.129 8.35431 20.2311C9.46875 20.7254 10.703 21 12 21Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="video-player__action-count">{comments}</span>
        </div>

        <div className="video-player__action">
          <div className="video-player__action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 12L13 4V8.5C4.5 8.5 2 11.5 2 20C3.5 17 4.5 15.5 13 15.5V20L22 12Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="video-player__action">
          <div className="video-player__action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="2" fill="white"/>
              <circle cx="12" cy="12" r="2" fill="white"/>
              <circle cx="19" cy="12" r="2" fill="white"/>
            </svg>
          </div>
        </div>

        <div className="video-player__action" onClick={handleCollapseClick}>
          <div className="video-player__action-icon video-player__action-icon--clickable">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 8H8V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 8H16V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 20V16H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 20V16H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
