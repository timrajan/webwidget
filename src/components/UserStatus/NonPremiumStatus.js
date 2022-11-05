import React from 'react'

const NonPremiumStatus = ({ id, isUserActive }) => {
  return (
    <>
      {isUserActive ? (
        <a
          className='atalki-page-link'
          href={`https://www.atalki.com/doc-page/${id}`}
          target='_blank'
          rel='noopener'
        >
          Chat With Us
        </a>
      ) : (
        <span>Offline</span>
      )}
    </>
  )
}

export default NonPremiumStatus
