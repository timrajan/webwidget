import React from 'react'

const Input = ({ placeholder, myRef, type = 'text' }) => {
  return (
    <input
      ref={myRef}
      type={type}
      placeholder={placeholder}
      className='input'
    />
  )
}

export default Input
