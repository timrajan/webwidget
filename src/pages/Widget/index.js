import React, { useState } from 'react'
import FAQPage from '../FAQPage'
import ChatPage from '../ChatPage'

const AtalkiWidget = ({ id, color, secColor, inIframe }) => {
  const [expand, toggelFaqBox] = useState(inIframe || false)
  const [showChatPage, setShowChatPage] = useState(false)

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
    <div
      className='atalki-faq-button'
      onClick={() => toggelFaqBox(true)}
      style={{ backgroundColor: color }}
    >
      Frequently Asked Questions
    </div>
  )
}

export default AtalkiWidget
