import React from 'react'
import VideoPlayer from './VideoPlayer'
import './VideoFeed.css'

const videos = [
  { 
    src: '/windmill.mp4', 
    title: 'Windmill', 
    episode: 'Nature Series',
    likes: '246k',
    comments: '1.9k'
  },
  { 
    src: '/brazil.mp4', 
    title: 'Brazil', 
    episode: 'Travel Diaries',
    likes: '892k',
    comments: '12.4k'
  },
  { 
    src: '/bison.mp4', 
    title: 'Bison', 
    episode: 'Wildlife',
    likes: '1.2M',
    comments: '8.7k'
  }
]

export default function VideoFeed() {
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
          />
        </div>
      ))}
    </div>
  )
}
