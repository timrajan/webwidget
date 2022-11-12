import React from 'react'

const TextArea = ({ placeholder, myRef, type = 'text' }) => {
  const handleInput = (e) => {
    if (myRef.current) {
      myRef.current.style.height = 'auto'
      myRef.current.style.height = `${e.target.scrollHeight - 16}px`
    }
  }
  return (
    <textarea
      type={type}
      ref={myRef}
      placeholder={placeholder}
      className='input textarea'
      onInput={handleInput}
      rows={1}
    />
  )
}

export default TextArea
