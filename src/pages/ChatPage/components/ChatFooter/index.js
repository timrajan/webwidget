import React from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/common/Input'
import TextArea from '../../../../components/common/TextArea'
import SendIcon from '../../../../icons/sendIcon'

const ChatFooter = () => {
  return (
    <div className='chat--footer flex aic'>
      <Input placeholder='I wish to connect with you..' />
      <Button cls='footer-btn'>
        <SendIcon className='icon' />
        SMS
      </Button>

      {/* <TextArea placeholder='Type your message..' />
      <Button cls='footer-btn'>
        <SendIcon className='icon' />
      </Button> */}
    </div>
  )
}

export default ChatFooter
