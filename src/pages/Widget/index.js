import React, { useEffect, useState } from 'react'
import FAQPage from '../FAQPage'
import ChatPage from '../ChatPage'
import { useUserStatusContext } from '../../context/userStatusContext'
const AtalkiWidget = ({ id, color, secColor, inIframe }) => {
  const [expand, toggelFaqBox] = useState(inIframe || false)
  const [showChatPage, setShowChatPage] = useState(false)
  const { isExpanded } = useUserStatusContext()

  useEffect(() => {
    if (inIframe) return

    toggelFaqBox(isExpanded)
  }, [isExpanded])

  const toggleChat = () => setShowChatPage((prev) => !prev)

  return expand ? (
    <div
      className={`
      ${
        !inIframe
          ? `atalki-widget-container ${
              expand ? 'atalki-expand' : 'atalki-collpase'
            }`
          : ''
      }
      ${inIframe ? 'atalki-widget-iframe-container' : ''}
      `}
    >
      {showChatPage ? (
        <ChatPage toggleChat={toggleChat} />
      ) : (
        <FAQPage
          id={id}
          color={color}
          secColor={secColor}
          inIframe={inIframe}
          toggelFaqBox={toggelFaqBox}
          expand={expand}
          toggleChat={toggleChat}
        />
      )}
    </div>
  ) : (
    <FAQToggle color={color} toggelFaqBox={toggelFaqBox} />
  )
}

const FAQToggle = ({ color, toggelFaqBox }) => {
  const { isUserActive } = useUserStatusContext()
  return (
    <div
      className='atalki-faq-button flex aic'
      onClick={() => toggelFaqBox(true)}
      style={{ backgroundColor: color }}
    >
      <span
        className={`atalki-status-icon ${isUserActive ? 'online' : 'offline'}`}
      ></span>
      <span style={{ marginLeft: '8px' }}>Frequently Asked Questions</span>
    </div>
  )
}

export default AtalkiWidget
