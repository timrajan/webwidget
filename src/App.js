import React from 'react'
import AtalkiWidget from './components/Widget'

function App({ domelement, inIframe }) {
  const id = domelement.getAttribute('data-atalki-docid')
  const color = domelement.getAttribute('data-atalki-color')
  // const secColor = domelement.getAttribute('data-secondary-color')

  if (!id) {
    console.error('Doc id is required')
    return null
  }

  return (
    <div className='atalki-main-container'>
      <AtalkiWidget id={id} color={color || '#027ffb'} inIframe={inIframe} />
    </div>
  )
}

export default App
