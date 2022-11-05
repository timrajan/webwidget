import React, { useEffect } from 'react'
import { useGlobalContext } from './context/globalContext'
import AtalkiWidget from './pages/Widget'

function App({ domelement, inIframe }) {
  const id = domelement.getAttribute('data-atalki-docid')
  const color = domelement.getAttribute('data-atalki-color') || '#027ffb'

  const { updateGlobalConfig } = useGlobalContext()
  useEffect(() => {
    updateGlobalConfig(id, color, inIframe)
  }, [])

  if (!id) {
    console.error('Doc id is required')
    return null
  }

  return (
    <div id='atalki-main-container'>
      <AtalkiWidget id={id} color={color || '#027ffb'} inIframe={inIframe} />
    </div>
  )
}

export default App
