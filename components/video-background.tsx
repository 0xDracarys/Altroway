"use client"

import { useState, useEffect } from "react"

interface VideoBackgroundProps {
  videoUrl?: string
  children: React.ReactNode
  className?: string
}

export function VideoBackground({
  videoUrl = "https://videos.pexels.com/video-files/3377752/3377752-hd_1920_1080_30fps.mp4",
  children,
  className = "",
}: VideoBackgroundProps) {
  const [videoAvailable, setVideoAvailable] = useState(false)

  useEffect(() => {
    // Test if we can load the video
    const video = new Image()
    setVideoAvailable(true)
  }, [])

  if (!videoAvailable) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl}
        onError={() => setVideoAvailable(false)}
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
