import React, { useState, useContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext'
import { useUserStatusContext } from './userStatusContext'
import { API_SOCKET_URL, API_URL } from '../constant'
import { generate_username } from '../utils/generateName'
import { generate_profile } from '../utils/generateProfile'

const initialState = {
  messages: [],
}

const ChatContext = React.createContext(initialState)

const useChatContext = () => useContext(ChatContext)

const ChatProvider = ({ children }) => {
  const { id } = useGlobalContext()
  const { isUserActive } = useUserStatusContext()
  const [messages, setMessages] = useState([])
  const [socket, updateSocket] = useState('')
  const [smsSent, setSmsSent] = useState(false)
  const [dummyMsgSent, setDummyMsgSent] = useState(false)

  const toggleSentSms = () => setSmsSent(true)
  const toggleDummySentMsg = () => setDummyMsgSent(true)

  const sendEmailNotif = async (msg) => {
    try {
      const res = await fetch(`${API_URL}/sendofflineowneremail/${id}/`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await res.json()
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleSendMessages = async (msgText, notifyOwner = true) => {
    if (!msgText) return
    const newMsg = {
      message: msgText,
      user_id: localStorage.getItem('username'),
      added_on: new Date(),
      is_owner: false,
      sent: false,
    }
    let payload = {}
    payload['message'] = msgText
    payload['position'] = 'right'
    payload['is_owner'] = false
    payload['username'] = localStorage.getItem('username')
    payload['profile_image'] = localStorage.getItem('chatuserprofileimage')
    payload['doc_id'] = parseInt(id)
    setMessages((prevMsg) => [...prevMsg, newMsg])
    if (socket && notifyOwner) {
      socket.send(JSON.stringify(payload))
    }
    if (notifyOwner) {
      await sendEmailNotif(msgText)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('username') === null)
      localStorage.username = generate_username(8)

    if (localStorage.getItem('chatuserprofileimage') === null)
      localStorage.chatuserprofileimage = generate_profile()
  }, [])

  useEffect(() => {
    if (isUserActive && !socket) {
      const socket = new WebSocket(
        `${API_SOCKET_URL}/ws/chat/${id}/${localStorage.username}`
      )

      socket.onclose = function (event) {
        console.log('error ' + event)
      }

      socket.onerror = function (event) {
        console.log('error ' + event)
      }

      socket.onopen = () => {
        updateSocket(socket)
      }

      socket.onmessage = (event) => {
        let { message } = JSON.parse(event.data)

        const newMsg = {
          user_id: localStorage.username,
          added_on: new Date(),
          is_owner: true,
          message,
          sent: true,
        }
        setMessages((prevMsg) => [...prevMsg, newMsg])
      }
    }
  }, [socket, isUserActive])

  useEffect(() => {
    if (socket && socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          message: 'channel_update',
          chatuserprofileimage: localStorage.chatuserprofileimage,
          doc_id: parseInt(id),
        })
      )
    }
  }, [socket])

  return (
    <ChatContext.Provider
      value={{
        messages,
        smsSent,
        toggleSentSms,
        dummyMsgSent,
        toggleDummySentMsg,
        handleSendMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatProvider, useChatContext, ChatContext }
