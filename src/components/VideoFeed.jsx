import React, { useState } from 'react'
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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setControlsVisible(true) // Show controls when toggling fullscreen
  }

  const showControls = () => {
    setControlsVisible(true)
  }

  const hideControls = () => {
    setControlsVisible(false)
  }

  return (
    <div className="video-feed">
      {videos.map((video, index) => (
        <div key={index} className="video-feed__item">
          <VideoPlayer 
            src={video.src}
            title={video.title}
            episode={video.episode}
            likes={video.likes}
            comments={video.comments}
            episodeNum={index + 1}
            fit={video.fit}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            controlsVisible={controlsVisible}
            onShowControls={showControls}
            onHideControls={hideControls}
          />
        </div>
      ))}
    </div>
  )
}
