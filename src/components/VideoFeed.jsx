import React, { useState, useRef, useCallback } from 'react'
import VideoPlayer from './VideoPlayer'
import SignInOverlay from './SignInOverlay'
import PaywallOverlay from './PaywallOverlay'
import FollowOverlay from './FollowOverlay'
import './VideoFeed.css'

// Episode indices (0-based) where overlays trigger
const SIGN_IN_AFTER_EPISODE = 5   // After EP 6 (index 5)
const PAYWALL_AFTER_EPISODE = 9   // After EP 10 (index 9)
const FOLLOW_AFTER_EPISODE = 14   // After EP 15 (index 14)

const videos = [
  { src: '/EP1. When he runs it back.mp4', title: 'The Ick', episode: 'When he runs it back', fit: 'cover' },
  { src: '/EP2. When he eats.mp4', title: 'The Ick', episode: 'When he eats', fit: 'cover' },
  { src: '/EP3. When he\'s the main character.mp4', title: 'The Ick', episode: 'When he\'s the main character', fit: 'cover' },
  { src: '/EP4. When he can\'t connect.mp4', title: 'The Ick', episode: 'When he can\'t connect', fit: 'cover' },
  { src: '/EP5. When he has an art.mp4', title: 'The Ick', episode: 'When he has an art', fit: 'cover' },
  { src: '/EP6. When he loves to ski.mp4', title: 'The Ick', episode: 'When he loves to ski', fit: 'cover' },
  { src: '/EP7. When he makes a sound.mp4', title: 'The Ick', episode: 'When he makes a sound', fit: 'cover' },
  { src: '/EP8. When he seeks professional help.mp4', title: 'The Ick', episode: 'When he seeks professional help', fit: 'cover' },
  { src: '/EP9. When he\'s a father.mp4', title: 'The Ick', episode: 'When he\'s a father', fit: 'cover' },
  { src: '/EP10. When he\'s on aux.mp4', title: 'The Ick', episode: 'When he\'s on aux', fit: 'cover' },
  { src: '/EP11. When he\'s packing.mp4', title: 'The Ick', episode: 'When he\'s packing', fit: 'cover' },
  { src: '/EP12. When you bring him home.mp4', title: 'The Ick', episode: 'When you bring him home', fit: 'cover' },
  { src: '/EP13. When he took the red pill.mp4', title: 'The Ick', episode: 'When he took the red pill', fit: 'cover' },
  { src: '/EP14. When he\'s prepared.mp4', title: 'The Ick', episode: 'When he\'s prepared', fit: 'cover' },
  { src: '/EP15. When he has sisters.mp4', title: 'The Ick', episode: 'When he has sisters', fit: 'cover' },
  { src: '/EP16. When he talks politics.mp4', title: 'The Ick', episode: 'When he talks politics', fit: 'cover' },
  { src: '/EP17. When he\'s being himself.mp4', title: 'The Ick', episode: 'When he\'s being himself', fit: 'cover' },
  { src: '/EP18. When he eats prepared meals.mp4', title: 'The Ick', episode: 'When he eats prepared meals', fit: 'cover' },
  { src: '/EP19. When she calls it fate.mp4', title: 'The Ick', episode: 'When she calls it fate', fit: 'cover' },
  { src: '/EP20. When he loves dogs.mp4', title: 'The Ick', episode: 'When he loves dogs', fit: 'cover' },
  { src: '/EP21. When he\'s impatient.mp4', title: 'The Ick', episode: 'When he\'s impatient', fit: 'cover' },
  { src: '/EP22. When he dreams.mp4', title: 'The Ick', episode: 'When he dreams', fit: 'cover' },
  { src: '/EP23. When she\'s too comfortable.mp4', title: 'The Ick', episode: 'When she\'s too comfortable', fit: 'cover' },
  { src: '/EP24. When he\'s in a band.mp4', title: 'The Ick', episode: 'When he\'s in a band', fit: 'cover' },
  { src: '/EP25. When he takes his shoes off.mp4', title: 'The Ick', episode: 'When he takes his shoes off', fit: 'cover' },
  { src: '/EP26. When he powers up too loud.mp4', title: 'The Ick', episode: 'When he powers up too loud', fit: 'cover' },
  { src: '/EP27. When he can\'t read the menu.mp4', title: 'The Ick', episode: 'When he can\'t read the menu', fit: 'cover' },
  { src: '/EP28. When he thinks it\'s a beach.mp4', title: 'The Ick', episode: 'When he thinks it\'s a beach', fit: 'cover' },
  { src: '/EP29. When he shaves his beard.mp4', title: 'The Ick', episode: 'When he shaves his beard', fit: 'cover' },
  { src: '/EP30. When he starts rationing.mp4', title: 'The Ick', episode: 'When he starts rationing', fit: 'cover' },
]

export default function VideoFeed() {
  const [controlsVisible, setControlsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState(3) // Start on EP 4
  const [isMuted, setIsMuted] = useState(true) // Start with sound off
  const [showSignIn, setShowSignIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const [showFollow, setShowFollow] = useState(false)
  const [hasSeenFollow, setHasSeenFollow] = useState(false)
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
    if (showSignIn || showPaywall || showFollow) return
    
    const nextIndex = activeIndex + 1
    
    // Check if trying to go past sign-in break (EP 7+ requires sign-in)
    if (!isSignedIn && nextIndex > SIGN_IN_AFTER_EPISODE) {
      setShowSignIn(true)
      return
    }
    
    // Check if trying to go past paywall break (EP 11+ requires payment)
    if (isSignedIn && !hasPaid && nextIndex > PAYWALL_AFTER_EPISODE) {
      setShowPaywall(true)
      return
    }
    
    if (activeIndex < videos.length - 1) {
      setActiveIndex(nextIndex)
    }
  }, [activeIndex, showSignIn, showPaywall, showFollow, isSignedIn, hasPaid])

  const goToPrev = useCallback(() => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall || showFollow) return
    
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1)
    }
  }, [activeIndex, showSignIn, showPaywall, showFollow])

  // Handle video completion - check for chapter breaks
  const handleVideoEnded = useCallback(() => {
    // Check if sign-in required after EP 6 (index 5)
    if (!isSignedIn && activeIndex === SIGN_IN_AFTER_EPISODE) {
      setShowSignIn(true)
      return
    }
    
    // Check if paywall required after EP 10 (index 9)
    if (isSignedIn && !hasPaid && activeIndex === PAYWALL_AFTER_EPISODE) {
      setShowPaywall(true)
      return
    }
    
    // Check if follow overlay should show after EP 15 (index 14)
    if (!hasSeenFollow && activeIndex === FOLLOW_AFTER_EPISODE) {
      setShowFollow(true)
      return
    }
    
    // Otherwise go to next video
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex, isSignedIn, hasPaid, hasSeenFollow])

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
    setHasPaid(true)
    // Go to next video if available
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex])

  // Handle follow overlay dismiss - continue playback
  const handleFollowDismiss = useCallback(() => {
    setShowFollow(false)
    setHasSeenFollow(true)
    // Go to next video if available
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex])

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    // Block if any overlay is shown
    if (showSignIn || showPaywall || showFollow) return
    
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
    if (showSignIn || showPaywall || showFollow) return
    
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
    if (showSignIn || showPaywall || showFollow) return
    
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
            isActive={activeIndex === index && !showSignIn && !showPaywall && !showFollow}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            isSignedIn={isSignedIn}
          />
        </div>
      ))}
      
      {/* Sign In Overlay - shown after EP 6 */}
      <SignInOverlay visible={showSignIn} onSignInComplete={handleSignInComplete} />
      
      {/* Paywall Overlay - shown after EP 10 */}
      <PaywallOverlay visible={showPaywall} onUnlock={handlePaywallUnlock} />
      
      {/* Follow Overlay - shown after EP 15 */}
      <FollowOverlay visible={showFollow} onDismiss={handleFollowDismiss} />
    </div>
  )
}
