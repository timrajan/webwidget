import React, { useState, useEffect } from 'react'

const UserStatus = ({ id }) => {
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
    // checkStatus()
    // const interval = setInterval(() => checkStatus(), 30000)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [])

  return (
    <>
      <span
        className={`atalki-status-icon ${isUserActive ? 'online' : 'offline'}`}
      />
      <span className='atalki-status'>
        {isUserActive ? 'Online' : 'Offline'}
      </span>
    </>
  )
}

export default UserStatus
