import React from 'react'

const ChatMessage = ({ message, isOwner, msgDate }) => {
  return (
    <div className={`flex message ${isOwner ? '' : 'end'}`}>
      <div className='message-text'>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ChatMessage
