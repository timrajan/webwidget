import React, { useRef, useState } from 'react'
import Button from '../../../../../components/Button'
import Input from '../../../../../components/common/Input'
import { API_URL } from '../../../../../constant'
import SendIcon from '../../../../../icons/sendIcon'

const SendSms = ({ color, id }) => {
  const inputRef = useRef()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  const requestSms = async (msg) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/requestowneronline/${id}/`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await res.json()
      console.log('Data', data)
      setData(data)
    } catch (error) {
      console.log('Error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = async () => {
    const msg = inputRef.current.value
    if (!msg) return
    console.log(msg)
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
        loading={loading}
      >
        <SendIcon />
        <span> SMS</span>
      </Button>
    </>
  )
}

export default SendSms
