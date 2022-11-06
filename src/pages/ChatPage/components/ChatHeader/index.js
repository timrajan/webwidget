import React from 'react'
import Button from '../../../../components/Button'
import UserStatus from '../../../../components/UserStatus'
import { useGlobalContext } from '../../../../context/globalContext'
import { useUserContext } from '../../../../context/userContext'

const ChatHeader = ({ toggleChat }) => {
  const { id, color } = useGlobalContext()
  const { first_name, email } = useUserContext()
  return (
    <div
      className='chat--header flex jcsb aic'
      style={{ backgroundColor: color }}
    >
      <div className='flex aic'>
        <p className='chat--title'>
          Chat with <span>{first_name || email}</span>
        </p>
        <UserStatus id={id} />
      </div>
      <Button handleClick={toggleChat}>FAQs</Button>
    </div>
  )
}

export default ChatHeader
