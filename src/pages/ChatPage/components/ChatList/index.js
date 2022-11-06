import React, { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'

const ChatList = ({ messages }) => {
  const msgListRef = useRef(null)
  useEffect(() => {
    if (msgListRef?.current) {
      msgListRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  return (
    <div className='chat--list'>
      {messages.map((msg, idx) => (
        <div key={idx} ref={msgListRef}>
          <ChatMessage
            message={msg.message}
            isOwner={msg.is_owner}
            msgDate={msg.added_on}
          />
        </div>
      ))}
    </div>
  )
}

export default ChatList
