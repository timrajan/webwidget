import React from 'react'
import ChatFooter from './components/ChatFooter'
import ChatHeader from './components/ChatHeader'
import ChatList from './components/ChatList'

const ChatPage = ({ toggleChat }) => {
  return (
    <div className='atalki-widget-faq-container chat'>
      <ChatHeader toggleChat={toggleChat} />
      <ChatList />
      <ChatFooter />
    </div>
  )
}

export default ChatPage
