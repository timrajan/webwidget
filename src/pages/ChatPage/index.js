import React, { useContext } from 'react'
import { GlobalContext, useGlobalContext } from '../../context/globalContext'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'
import ChatList from './components/ChatList'

const ChatPage = ({ toggleChat }) => {
  const data = useContext(GlobalContext)
  console.log('data', data)
  return (
    <div className='atalki-widget-faq-container chat'>
      <ChatHeader toggleChat={toggleChat} />
      <ChatList />
      <ChatFooter />
    </div>
  )
}

export default ChatPage
