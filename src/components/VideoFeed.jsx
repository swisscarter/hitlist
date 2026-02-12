import React, { useState, useRef, useCallback } from 'react'
import VideoPlayer from './VideoPlayer'
import './VideoFeed.css'

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
  const feedRef = useRef(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchEndRef = useRef({ x: 0, y: 0 })

  const showControls = () => {
    setControlsVisible(true)
  }

  const hideControls = () => {
    setControlsVisible(false)
  }

  const goToNext = useCallback(() => {
    if (activeIndex < videos.length - 1) {
      setActiveIndex(prev => prev + 1)
    }
  }, [activeIndex])

  const goToPrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1)
    }
  }, [activeIndex])

  // Handle swipe gestures
  const handleTouchStart = (e) => {
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
            onVideoEnded={goToNext}
            isActive={activeIndex === index}
          />
        </div>
      ))}
    </div>
  )
}
