import dayjs from 'dayjs'
import React from 'react'
import { API_DOMAIN } from '../../../../../constant'
import { useUserContext } from '../../../../../context/userContext'

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
          <span className='message-date'>{dayjs(msgDate).format('HH:mm')}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
