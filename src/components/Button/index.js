import React from 'react'

const Button = ({ handleClick, children, cls = '', type = 'button' }) => {
  return (
    <button className={`btn flex aic ${cls}`} type={type} onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button
