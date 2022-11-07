import React from 'react'

const Button = ({
  handleClick,
  color,
  children,
  cls = '',
  type = 'button',
  loading,
}) => {
  return (
    <button
      style={{ backgroundColor: color ? color : '' }}
      className={`btn flex aic ${cls}`}
      type={type}
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? <div className='button--loading'></div> : <>{children}</>}
    </button>
  )
}

export default Button
