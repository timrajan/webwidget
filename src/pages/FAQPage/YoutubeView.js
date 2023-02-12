import React from 'react'
import { extractVideoID } from '../../utils/extractVideoID'

const YoutubeView = ({ yt_url }) => {
  const yt_id = extractVideoID(yt_url)
  if (!yt_id || !yt_url) {
    return (
      <div className='flex aic jic youtube '>
        <span>Failed To Load Youtube Answer</span>
      </div>
    )
  }
  return (
    <div className='youtube'>
      <iframe
        id='yt-iframe'
        width='100%'
        height='400'
        src={`https://www.youtube.com/embed/${yt_id}?autoplay=1&mute=1`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YoutubeView
