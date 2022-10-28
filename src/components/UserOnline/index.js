import React, { useState, useEffect } from 'react'

const UserOnline = ({ id }) => {
  const [isUserActive, setIsUserActive] = useState(false)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(
          `https://www.atalki.com/api/v2/getsingledocinfo_noauth/${btoa(id)}/`
        )
        const data = await res.json()
        setIsUserActive(data.is_owner_online)
      } catch (error) {
        console.log('failed to get user status', error)
      }
    }
    checkStatus()
    const interval = setInterval(() => checkStatus(), 30000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <span
        className={`atalki-status-icon ${isUserActive ? 'online' : 'offline'}`}
      />

      {isUserActive ? (
        <a
          className='atalki-page-link'
          href={`https://www.atalki.com/doc-page/${id}`}
          target='_blank'
          rel='noopener'
          style={{ marginLeft: '3px' }}
        >
          Chat With Us
        </a>
      ) : (
        <span style={{ marginLeft: '3px' }}>Offline</span>
      )}
    </>
  )
}

export default UserOnline
