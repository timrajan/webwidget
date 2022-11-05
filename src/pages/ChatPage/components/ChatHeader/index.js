import React from 'react'
import Button from '../../../../components/Button'
import UserStatus from '../../../../components/UserStatus'

const ChatHeader = ({ toggleChat }) => {
  return (
    <div className='chat--header flex jcsb aic'>
      <div className='flex aic'>
        <p className='chat--title'>
          Chat with <span>avi@gmail.com</span>
        </p>
        <UserStatus />
      </div>
      <Button handleClick={toggleChat}>FAQs</Button>
    </div>
  )
}

export default ChatHeader
