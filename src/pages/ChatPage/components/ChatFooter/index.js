import React, { useRef, useEffect } from 'react'
import Button from '../../../../components/Button'
import TextArea from '../../../../components/common/TextArea'
import { useChatContext } from '../../../../context/chatContext'
import { useGlobalContext } from '../../../../context/globalContext'
import { useUserStatusContext } from '../../../../context/userStatusContext'
import SendIcon from '../../../../icons/sendIcon'
import SendSms from './SendSms'

const ChatFooter = () => {
  const { color, id } = useGlobalContext()
  const { isUserActive } = useUserStatusContext()
  const { smsSent, handleSendMessages, dummyMsgSent, toggleDummySentMsg } =
    useChatContext()
  const inputRef = useRef()

  useEffect(() => {
    if (!dummyMsgSent && !isUserActive) {
      handleSendMessages(
        'It seems chat owner is offline. You can notify chat owner by sending a sms/message',
        false
      )
      toggleDummySentMsg()
    }
  }, [dummyMsgSent, isUserActive])

  const handleClick = () => {
    const msg = inputRef.current.value
    if (!msg) return
    handleSendMessages(msg)
    inputRef.current.value = ''
  }

  return (
    <div className='chat--footer flex aic'>
      {!smsSent && !isUserActive && <SendSms color={color} id={id} />}
      {(smsSent || isUserActive) && (
        <>
          <TextArea myRef={inputRef} placeholder='Type your message..' />
          <Button cls='footer-btn' color={color} handleClick={handleClick}>
            <SendIcon />
          </Button>
        </>
      )}
    </div>
  )
}

export default ChatFooter
