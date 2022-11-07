import React from 'react'
import { API_DOMAIN } from '../../../../../constant'
import { useUserContext } from '../../../../../context/userContext'

const formatTime = (date = new Date()) =>
  `${date.getHours()}:${date.getMinutes()}`

const ChatMessage = ({ message, isOwner, msgDate }) => {
  const { avatar } = useUserContext()
  return (
    <div className={`flex message ${isOwner ? '' : 'end'}`}>
      <div className='message-container'>
        {isOwner && (
          <div className='message-owner-img'>
            <img src={`${API_DOMAIN}${avatar}`} />
          </div>
        )}
        <div className='flex message-content'>
          <div className='message-text'>
            <p>{message}</p>
          </div>
          <span className='message-date'>{formatTime(new Date(msgDate))}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
