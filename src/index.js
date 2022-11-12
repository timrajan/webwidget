import React from 'react'
import { createRoot } from 'react-dom/client'
import css from 'bundle-text:./styles/index.css'
import App from './App'
import { GlobalProvider } from './context/globalContext'
import { UserProvider } from './context/userContext'
import { UserStatusProvider } from './context/userStatusContext'
import { FaqProvider } from './context/faqContext'
import { ChatProvider } from './context/chatContext'

let style = document.createElement('style')
style.type = 'text/css'
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)

const scriptTag = document.querySelector(
  'script[data-atalki-docid][data-atalki-color]'
)

const widgetDiv = document.createElement('div')
widgetDiv.classList.add('atalki-widget')

if (scriptTag) {
  widgetDiv.setAttribute(
    'data-atalki-docid',
    scriptTag.getAttribute('data-atalki-docid')
  )
  widgetDiv.setAttribute(
    'data-atalki-color',
    scriptTag.getAttribute('data-atalki-color')
  )

  const inIframe = scriptTag.getAttribute('data-atalki-inFrame') || false

  scriptTag.parentNode.insertBefore(widgetDiv, scriptTag)

  const root = createRoot(widgetDiv)
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <UserProvider>
          <UserStatusProvider>
            <FaqProvider>
              <ChatProvider>
                <App domelement={widgetDiv} inIframe={inIframe} />
              </ChatProvider>
            </FaqProvider>
          </UserStatusProvider>
        </UserProvider>
      </GlobalProvider>
    </React.StrictMode>
  )
}
