import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../../components/Button'
import Input from '../../../../../components/common/Input'
import { API_URL } from '../../../../../constant'
import SendIcon from '../../../../../icons/sendIcon'
import { useChatContext } from '../../../../../context/chatContext'

const SendSms = ({ color, id }) => {
  const { msgSent, toggleSentMsg, handleSendMessages } = useChatContext()
  const inputRef = useRef()
  const [loading, setLoading] = useState(false)
  // const [data, setData] = useState()

  useEffect(() => {
    if (!msgSent) {
      handleSendMessages(
        'It seems chat owner is offline. You can notify chat owner by sending a sms'
      )
    }
  }, [msgSent])

  const requestSms = async (msg) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/requestowneronline/${id}/`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await res.json()
      toggleSentMsg()
      handleSendMessages(
        'Owner Successfully Notified,You will get response in a while'
      )
      console.log('Data', data)
      // setData(data)
    } catch (error) {
      console.log('Error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = async () => {
    const msg = inputRef.current.value
    if (!msg || msgSent) return
    await requestSms()
    inputRef.current.value = ''
  }
  return (
    <>
      <Input myRef={inputRef} placeholder='I wish to connect with you..' />
      <Button
        cls='footer-btn'
        color={color}
        handleClick={handleClick}
        disabled={loading || msgSent}
        loading={loading}
      >
        <SendIcon />
        <span> SMS</span>
      </Button>
    </>
  )
}

export default SendSms
