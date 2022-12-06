import React, { useRef, useState } from 'react'
import Button from '../../../../../components/Button'
import Input from '../../../../../components/common/Input'
import { API_URL } from '../../../../../constant'
import SendIcon from '../../../../../icons/sendIcon'
import { useChatContext } from '../../../../../context/chatContext'

const SendSms = ({ color, id }) => {
  const { smsSent, toggleSentSms, handleSendMessages } = useChatContext()
  const inputRef = useRef()
  const [loading, setLoading] = useState(false)

  const getSmsResponse = async () => {
    try {
      const res = await fetch(`${API_URL}/requestowneronlineresponse/${id}/`)
      const data = await res.json()
      console.log('Data', data)
      if (data?.[0]?.body) {
        handleSendMessages(data?.[0]?.body, false)
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const requestSms = async (msg) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/requestowneronline/${id}/`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const _data = await res.json()
      toggleSentSms()
      handleSendMessages(
        'Owner Successfully Notified,You will get a response in few seconds',
        false
      )
      setTimeout(async () => {
        await getSmsResponse()
      }, 22000)
    } catch (error) {
      console.log('Error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = inputRef.current.value
    if (!msg || smsSent) return
    await requestSms(msg)
    inputRef.current.value = ''
  }
  return (
    <form onSubmit={handleSubmit} className='chat--footer flex aic'>
      <Input myRef={inputRef} placeholder='I wish to connect with you..' />
      <Button
        cls='footer-btn'
        color={color}
        type='submit'
        disabled={loading || smsSent}
        loading={loading}
      >
        <SendIcon />
        <span> SMS</span>
      </Button>
    </form>
  )
}

export default SendSms
