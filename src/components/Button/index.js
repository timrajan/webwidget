import React from 'react'

const Button = ({
  handleClick,
  color,
  children,
  cls = '',
  type = 'button',
}) => {
  return (
    <button
      style={{ backgroundColor: color ? color : '' }}
      className={`btn flex aic ${cls}`}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
