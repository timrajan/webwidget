import React from 'react'

const AudioIcon = ({ isActive }) => (
  <svg
    stroke='currentColor'
    fill='currentColor'
    data-icon='audio'
    className={`icon ${isActive ? 'filter-icon-active' : ''}`}
    strokeWidth={0}
    viewBox='0 0 24 24'
    height='16'
    width='16'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path fill='none' d='M0 0h24v24H0V0z' stroke='none' />
    <path
      d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'
      stroke='none'
    />
  </svg>
)

export default AudioIcon
