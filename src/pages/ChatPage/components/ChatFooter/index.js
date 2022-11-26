import React, { useRef, useEffect } from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/common/Input'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = inputRef.current.value
    if (!msg) return
    handleSendMessages(msg)
    inputRef.current.value = ''
  }

  return (
    <>
      {!smsSent && !isUserActive && <SendSms color={color} id={id} />}
      {(smsSent || isUserActive) && (
        <form onSubmit={handleSubmit} className='chat--footer flex aic'>
          <Input myRef={inputRef} placeholder='Type your message..' />
          <Button cls='footer-btn' color={color} type='submit'>
            <SendIcon />
          </Button>
        </form>
      )}
    </>
  )
}

export default ChatFooter
