import React from 'react'

const TextArea = ({ placeholder, type = 'text' }) => {
  return (
    <textarea
      type={type}
      placeholder={placeholder}
      className='input textarea'
      rows={1}
    />
  )
}

export default TextArea
