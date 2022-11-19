import React from 'react'

const AudioView = ({ audio_url }) => {
  if (!audio_url) {
    return (
      <div className='flex aic audio '>
        <span>Failed To Load Audio Answer</span>
      </div>
    )
  }
  return (
    <div className='audio'>
      <audio width={'100%'} controls src={`https://www.atalki.com${audio_url}`}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  )
}

export default AudioView
