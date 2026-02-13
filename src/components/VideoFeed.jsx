import React, { useState, useRef, useCallback } from 'react'
import VideoPlayer from './VideoPlayer'
import SignInOverlay from './SignInOverlay'
import PaywallOverlay from './PaywallOverlay'
import './VideoFeed.css'

const MAX_FREE_VIDEOS = 3
const VIDEOS_BEFORE_PAYWALL = 3

const videos = [
  { 
    src: '/When he can\'t connect.mp4', 
    title: 'The Ick', 
    episode: 'When he can\'t connect',
    fit: 'cover'
  },
  { 
    src: '/When he has an art.mp4', 
    title: 'The Ick', 
    episode: 'When he has an art',
    fit: 'cover'
  },
  { 
    src: '/When he loves to ski.mp4', 
    title: 'The Ick', 
    episode: 'When he loves to ski',
    fit: 'cover'
  },
  { 
    src: '/When he makes a sound.mp4', 
    title: 'The Ick', 
    episode: 'When he makes a sound',
    fit: 'cover'
  },
  { 
    src: '/When he runs it back.mp4', 
    title: 'The Ick', 
    episode: 'When he runs it back',
    fit: 'cover'
  },
  { 
    src: '/When he seeks professional help.mp4', 
    title: 'The Ick', 
    episode: 'When he seeks professional help',
    fit: 'cover'
  },
  { 
    src: '/When he\'s packing.mp4', 
    title: 'The Ick', 
    episode: 'When he\'s packing',
    fit: 'cover'
  },
  { 
    src: '/When he\'s the main character.mp4', 
    title: 'The Ick', 
    episode: 'When he\'s the main character',
    fit: 'cover'
  }
]

export default function VideoFeed() {
  const [controlsVisible, setControlsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true) // Start with sound off
  const [videosWatched, setVideosWatched] = useState(0)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [videosAfterSignIn, setVideosAfterSignIn] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const feedRef = useRef(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchEndRef = useRef({ x: 0, y: 0 })

  const showControls = () => {
    setControlsVisible(true)
  }

  const hideControls = () => {
    setControlsVisible(false)
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  const goToNext = useCallback(() => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall) return
    
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex, showSignIn, showPaywall])

  const goToPrev = useCallback(() => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall) return
    
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1)
    }
  }, [activeIndex, showSignIn, showPaywall])

  // Handle video completion - track watched count
  const handleVideoEnded = useCallback(() => {
    // If signed in, track videos after sign-in for paywall
    if (isSignedIn) {
      const newCount = videosAfterSignIn + 1
      setVideosAfterSignIn(newCount)
      
      // Show paywall after 3 more videos
      if (newCount >= VIDEOS_BEFORE_PAYWALL) {
        setShowPaywall(true)
        return
      }
    } else {
      // Not signed in yet - track for sign-in prompt
      const newWatchCount = videosWatched + 1
      setVideosWatched(newWatchCount)
      
      // Show sign in overlay after 3 videos
      if (newWatchCount >= MAX_FREE_VIDEOS) {
        setShowSignIn(true)
        return
      }
    }
    
    // Otherwise go to next video
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [videosWatched, activeIndex, isSignedIn, videosAfterSignIn])

  // Handle successful sign-in - dismiss overlays and continue
  const handleSignInComplete = useCallback(() => {
    setShowSignIn(false)
    setIsSignedIn(true)
    // Go to next video if available
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex])

  // Handle paywall unlock - dismiss overlay and continue
  const handlePaywallUnlock = useCallback(() => {
    setShowPaywall(false)
    setVideosAfterSignIn(0) // Reset counter for next chapter
    // Go to next video if available
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex])

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall) return
    
    // Don't track swipes on progress bar
    if (e.target.closest('.video-player__progress-bar')) {
      touchStartRef.current = null
      return
    }
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  const handleTouchEnd = (e) => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall) return
    
    // Skip if touch started on progress bar
    if (!touchStartRef.current) return

    touchEndRef.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }

    const deltaX = touchStartRef.current.x - touchEndRef.current.x
    const deltaY = touchStartRef.current.y - touchEndRef.current.y
    const minSwipeDistance = 50

    // Only trigger if horizontal swipe is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swiped left - go to next
        goToNext()
      } else {
        // Swiped right - go to previous
        goToPrev()
      }
    }
  }

  // Handle tap on left/right edges for navigation
  const handleTapNavigation = (e) => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall) return
    
    // Don't navigate if interacting with progress bar or bottom controls
    if (e.target.closest('.video-player__progress-bar') || 
        e.target.closest('.video-player__bottom')) {
      return
    }

    const rect = feedRef.current?.getBoundingClientRect()
    if (!rect) return

    const tapX = e.clientX - rect.left
    const edgeWidth = rect.width * 0.15 // 15% of width for edge tap zones

    if (tapX < edgeWidth) {
      goToPrev()
    } else if (tapX > rect.width - edgeWidth) {
      goToNext()
    }
  }

  return (
    <div 
      className="video-feed" 
      ref={feedRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleTapNavigation}
    >
      {videos.map((video, index) => (
        <div 
          key={index} 
          className={`video-feed__item ${activeIndex === index ? 'video-feed__item--active' : ''}`}
          data-index={index}
        >
          <VideoPlayer 
            src={video.src}
            title={video.title}
            episode={video.episode}
            episodeNum={index + 1}
            fit={video.fit}
            controlsVisible={controlsVisible}
            onShowControls={showControls}
            onHideControls={hideControls}
            onVideoEnded={handleVideoEnded}
            isActive={activeIndex === index && !showSignIn && !showPaywall}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        </div>
      ))}
      
      {/* Sign In Overlay - shown after MAX_FREE_VIDEOS watched */}
      <SignInOverlay visible={showSignIn} onSignInComplete={handleSignInComplete} />
      
      {/* Paywall Overlay - shown after VIDEOS_BEFORE_PAYWALL watched (post sign-in) */}
      <PaywallOverlay visible={showPaywall} onUnlock={handlePaywallUnlock} />
    </div>
  )
}
