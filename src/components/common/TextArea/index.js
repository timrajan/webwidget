import React from 'react'

const TextArea = ({ placeholder, myRef, type = 'text' }) => {
  return (
    <textarea
      type={type}
      ref={myRef}
      placeholder={placeholder}
      className='input textarea'
      rows={1}
    />
  )
}

export default TextArea
