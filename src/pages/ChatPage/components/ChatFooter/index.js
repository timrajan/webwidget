import React, { useState } from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/common/Input'
import TextArea from '../../../../components/common/TextArea'
import SendIcon from '../../../../icons/sendIcon'

const ChatFooter = ({ onSendMsg }) => {
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
      {/* <Input placeholder='I wish to connect with you..' />
      <Button cls='footer-btn'>
        <SendIcon className='icon' />
        SMS
      </Button> */}

      <TextArea
        value={msgText}
        placeholder='Type your message..'
        onChange={handleChange}
      />
      <Button cls='footer-btn' handleClick={handleClick}>
        <SendIcon className='icon' />
      </Button>
    </div>
  )
}

export default ChatFooter
