import React from 'react'
import YouTube from 'react-youtube'
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
  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 0,
    },
  }
  return (
    <div className='youtube'>
      <YouTube videoId={yt_id} opts={opts} id='yt-iframe' />
    </div>
  )
}

export default YoutubeView
