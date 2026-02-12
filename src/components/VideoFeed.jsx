import React, { useState, useRef, useEffect } from 'react'
import VideoPlayer from './VideoPlayer'
import './VideoFeed.css'

const videos = [
  { 
    src: '/part1.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 1',
    fit: 'cover'
  },
  { 
    src: '/part2.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 2',
    fit: 'cover'
  },
  { 
    src: '/part3.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 3',
    fit: 'cover'
  },
  { 
    src: '/part4.mp4', 
    title: 'The Undercover Doctor', 
    episode: 'Part 4',
    fit: 'cover'
  }
]

export default function VideoFeed() {
  const [controlsVisible, setControlsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const feedRef = useRef(null)
  const itemRefs = useRef([])

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
            episodeNum={index + 1}
            fit={video.fit}
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
