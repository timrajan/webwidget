import React from 'react'
import ReactDOM from 'react-dom'
import css from 'bundle-text:./index.css'
import App from './App'

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

  ReactDOM.render(
    <React.StrictMode>
      <App domelement={widgetDiv} inIframe={inIframe} />
    </React.StrictMode>,
    widgetDiv
  )
}
