import React, { useRef } from 'react'
import Button from '../../../../components/Button'
import TextArea from '../../../../components/common/TextArea'
import { useChatContext } from '../../../../context/chatContext'
import { useGlobalContext } from '../../../../context/globalContext'
import { useUserStatusContext } from '../../../../context/userStatusContext'
import SendIcon from '../../../../icons/sendIcon'
import SendSms from './SendSms'

const ChatFooter = ({ onSendMsg }) => {
  const { color, id } = useGlobalContext()
  const { isUserActive } = useUserStatusContext()
  const { handleSendMessages } = useChatContext()
  const inputRef = useRef()

  const handleClick = () => {
    const msg = inputRef.current.value
    if (!msg) return
    handleSendMessages(msg)
    inputRef.current.value = ''
  }

  return (
    <div className='chat--footer flex aic'>
      {isUserActive ? (
        <>
          <TextArea myRef={inputRef} placeholder='Type your message..' />
          <Button cls='footer-btn' color={color} handleClick={handleClick}>
            <SendIcon />
          </Button>
        </>
      ) : (
        <SendSms color={color} id={id} />
      )}
    </div>
  )
}

export default ChatFooter
