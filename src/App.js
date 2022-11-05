import React, { useContext } from 'react'
import { useEffect } from 'react'
import { GlobalContext, useGlobalContext } from './context/globalContext'
import AtalkiWidget from './pages/Widget'

function App({ domelement, inIframe }) {
  const id = domelement.getAttribute('data-atalki-docid')
  const color = domelement.getAttribute('data-atalki-color')
  console.log(id, typeof id)
  console.log(color, typeof color)
  console.count('re-rerender')

  if (!id) {
    console.error('Doc id is required')
    return null
  }
  const { updateGlobalConfig } = useContext(GlobalContext)
  useEffect(() => {
    console.log('I am called')
    updateGlobalConfig(id, color, inIframe)
  }, [])

  return (
    <div id='atalki-main-container'>
      <AtalkiWidget id={id} color={color || '#027ffb'} inIframe={inIframe} />
    </div>
  )
}

export default App
