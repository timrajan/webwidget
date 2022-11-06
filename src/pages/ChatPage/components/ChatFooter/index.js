import React, { useState } from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/common/Input'
import TextArea from '../../../../components/common/TextArea'
import { useGlobalContext } from '../../../../context/globalContext'
import { useUserStatusContext } from '../../../../context/userStatusContext'
import SendIcon from '../../../../icons/sendIcon'

const ChatFooter = ({ onSendMsg }) => {
  const { color } = useGlobalContext()
  const { isUserActive } = useUserStatusContext()
  const [msgText, setMsgText] = useState('')

  const handleChange = (e) => {
    setMsgText(e.target.value)
  }

  const handleClick = () => {
    onSendMsg(msgText)
    setMsgText('')
  }

  return (
    <div className='chat--footer flex aic'>
      {isUserActive ? (
        <>
          {' '}
          <TextArea
            value={msgText}
            placeholder='Type your message..'
            onChange={handleChange}
          />
          <Button cls='footer-btn' color={color} handleClick={handleClick}>
            <SendIcon />
          </Button>
        </>
      ) : (
        <>
          <Input placeholder='I wish to connect with you..' />
          <Button cls='footer-btn' color={color}>
            <SendIcon />
            <span> SMS</span>
          </Button>
        </>
      )}
    </div>
  )
}

export default ChatFooter
