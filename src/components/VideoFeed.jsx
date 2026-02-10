import React, { useState, useRef, useEffect } from 'react'
import VideoPlayer from './VideoPlayer'
import './VideoFeed.css'

const videos = [
  { 
    src: '/part1.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 1',
    likes: '1.2M',
    comments: '24.8k',
    fit: 'cover'
  },
  { 
    src: '/part2.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 2',
    likes: '986k',
    comments: '18.3k',
    fit: 'cover'
  },
  { 
    src: '/part3.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 3',
    likes: '847k',
    comments: '15.1k',
    fit: 'cover'
  },
  { 
    src: '/part4.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 4',
    likes: '723k',
    comments: '12.6k',
    fit: 'cover'
  }
]

export default function VideoFeed() {
  // Shared state across all videos
  const [isExpanded, setIsExpanded] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const feedRef = useRef(null)
  const itemRefs = useRef([])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    setControlsVisible(true) // Show controls when toggling
  }

  const showControls = () => {
    setControlsVisible(true)
  }

  const hideControls = () => {
    setControlsVisible(false)
  }

  const scrollToNext = (currentIndex) => {
    const nextIndex = currentIndex + 1
    if (nextIndex < videos.length && itemRefs.current[nextIndex]) {
      itemRefs.current[nextIndex].scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Use IntersectionObserver to detect which video is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10)
            setActiveIndex(index)
          }
        })
      },
      {
        root: feedRef.current,
        threshold: 0.6 // 60% visible to be considered active
      }
    )

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item)
      })
    }
  }, [])

  return (
    <div className="video-feed" ref={feedRef}>
      {videos.map((video, index) => (
        <div 
          key={index} 
          className="video-feed__item"
          ref={(el) => (itemRefs.current[index] = el)}
          data-index={index}
        >
          <VideoPlayer 
            src={video.src}
            title={video.title}
            episode={video.episode}
            likes={video.likes}
            comments={video.comments}
            episodeNum={index + 1}
            fit={video.fit}
            isExpanded={isExpanded}
            onToggleExpanded={toggleExpanded}
            controlsVisible={controlsVisible}
            onShowControls={showControls}
            onHideControls={hideControls}
            onVideoEnded={() => scrollToNext(index)}
            isActive={activeIndex === index}
          />
        </div>
      ))}
    </div>
  )
}
