import React from 'react'

const TextArea = ({ placeholder, onChange, value, type = 'text' }) => {
  return (
    <textarea
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='input textarea'
      rows={1}
    />
  )
}

export default TextArea
