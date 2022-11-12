import React from 'react'

const Button = ({
  handleClick,
  color,
  children,
  loading,
  disabled,
  cls = '',
  type = 'button',
}) => {
  return (
    <button
      style={{ backgroundColor: color ? color : '' }}
      className={`btn flex aic ${cls}`}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? <div className='button--loading'></div> : <>{children}</>}
    </button>
  )
}

export default Button
