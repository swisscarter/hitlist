import React, { useState, useEffect, useCallback, useRef } from 'react'
import './VideoPlayer.css'

export default function VideoPlayer({ 
  src, 
  title = 'Show Title', 
  episode = 'Episode Name',
  episodeNum = 1,
  fit = 'contain',
  controlsVisible,
  onShowControls,
  onHideControls,
  onVideoEnded,
  isActive,
  isMuted = true,
  onToggleMute,
  isSignedIn = false
}) {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isSeeking, setIsSeeking] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const videoRef = useRef(null)
  const hideTimeoutRef = useRef(null)
  const titleTimeoutRef = useRef(null)
  const progressBarRef = useRef(null)

  // Handle active state - play/pause and restart based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.currentTime = 0 // Restart from beginning
      video.play().then(() => setIsPlaying(true)).catch(() => {})
      
      // Show title at the start of episode for 6 seconds
      setShowTitle(true)
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current)
      }
      titleTimeoutRef.current = setTimeout(() => {
        setShowTitle(false)
      }, 6000)
    } else {
      video.pause()
      setIsPlaying(false)
      // Clear title timeout when leaving this episode
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current)
      }
      setShowTitle(false)
    }

    return () => {
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current)
      }
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

  // Auto-hide controls after 2 seconds
  useEffect(() => {
    if (!controlsVisible) return

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
  }, [controlsVisible, onHideControls])

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

    // Show controls on tap
    onShowControls()
  }, [onShowControls])

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
      {/* Top Section - Show title and episode */}
      <div className={`video-player__top ${(showTitle || controlsVisible) ? '' : 'video-player__top--hidden'}`}>
        <span className="video-player__show-title">{title}</span>
        <span className="video-player__episode-title">{episode}</span>
      </div>

      {/* Media Area with video */}
      <div className="video-player__media">
        <video 
          ref={videoRef}
          className="video-player__video"
          style={{ objectFit: fit }}
          src={src}
          muted={isMuted}
          playsInline
          onEnded={onVideoEnded}
        />
      </div>

      {/* Bottom Section - minimal view only */}
      <MinimalBottom 
        visible={controlsVisible}
        episodeNum={episodeNum}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        isSignedIn={isSignedIn}
      />

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

/* Minimal Bottom - volume, episodes, CC (auto-hides) */
function MinimalBottom({ visible, episodeNum, isMuted, onToggleMute, isSignedIn }) {
  const handleSoundClick = (e) => {
    e.stopPropagation()
    onToggleMute()
  }

  return (
    <div className={`video-player__bottom video-player__bottom--minimal ${visible ? '' : 'video-player__bottom--hidden'}`}>
      {/* Left - Volume */}
      <div className="video-player__fs-left">
        <div className="video-player__fs-icon video-player__fs-icon--clickable" onClick={handleSoundClick}>
          {isMuted ? (
            /* Sound Off Icon */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.69722 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H5.69722C5.89464 16 6.08765 16.0584 6.25192 16.168L12 20V4L6.25192 7.83205C6.08765 7.94156 5.89464 8 5.69722 8Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M21.5 10L17.5 14M17.5 10L21.5 14" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Sound On Icon */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.69722 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H5.69722C5.89464 16 6.08765 16.0584 6.25192 16.168L12 20V4L6.25192 7.83205C6.08765 7.94156 5.89464 8 5.69722 8Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.07 4.93C20.94 6.8 22 9.33 22 12C22 14.67 20.94 17.2 19.07 19.07M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>

      {/* Center - Episodes Badge (only shown when signed in) */}
      <div className="video-player__fs-center">
        {isSignedIn && (
          <div className="video-player__episodes-badge">
            <span>EP {episodeNum}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Right - CC */}
      <div className="video-player__fs-right">
        <div className="video-player__fs-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M8.5 10.5C8.5 9.67157 9.17157 9 10 9C10.5 9 10.9 9.2 11.2 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8.5 13.5C8.5 14.3284 9.17157 15 10 15C10.5 15 10.9 14.8 11.2 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M13.5 10.5C13.5 9.67157 14.1716 9 15 9C15.5 9 15.9 9.2 16.2 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M13.5 13.5C13.5 14.3284 14.1716 15 15 15C15.5 15 15.9 14.8 16.2 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

