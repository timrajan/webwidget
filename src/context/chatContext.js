import React, { useState, useContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext'
import { useUserStatusContext } from './userStatusContext'
import { API_SOCKET_URL } from '../constant'
import { generate_username } from '../utils/generateName'
import { generate_profile } from '../utils/generateProfile'

const dummyMessages = [
  {
    message: 'hello',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:49:15.934596Z',
    is_owner: false,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message: 'hy',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T08:19:23.384779Z',
    is_owner: true,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message: 'hhlk',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T10:49:36.469275Z',
    is_owner: false,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message:
      'iugihkiougjiuguuyviguihhhuouhhouguyfolguoilkgogiugougligg gdsfdfjfgsdfdhdhdsdgds stsetewtery',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T02:20:28.332576Z',
    is_owner: true,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message:
      'fgdrhfhdfgsdgdffggdsfdfjfgsdfdhdhdsdgds stsetewtery r r reyet  y re etrhetfetet t se fwe terhtdf bfgtwe tetjhtgdfhteg d h fgdgfdhdfh',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:50:45.238515Z',
    is_owner: false,
    profile_image: 'crab',
    link: null,
    name: null,
  },
]

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
  const [msgSent, setMsgSent] = useState(false)

  const toggleSentMsg = () => setMsgSent(true)

  const handleSendMessages = (msgText) => {
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
    if (isUserActive) {
      socket.send(JSON.stringify(payload))
    }

    setMessages((prevMsg) => [...prevMsg, newMsg])
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
        msgSent,
        toggleSentMsg,
        handleSendMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatProvider, useChatContext, ChatContext }
