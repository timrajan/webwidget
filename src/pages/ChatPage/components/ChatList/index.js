import React from 'react'
import ChatMessage from './ChatMessage'

const messages = [
  {
    message: 'hello',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:49:15.934596Z',
    is_owner: false,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message: 'hy',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:49:23.384779Z',
    is_owner: true,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message: 'hhlk',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:49:36.469275Z',
    is_owner: false,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message:
      'iugihkiougjiuguuyviguihhhuouhhouguyfolguoilkgogiugougligg gdsfdfjfgsdfdhdhdsdgds stsetewtery',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:50:28.332576Z',
    is_owner: true,
    profile_image: 'crab',
    link: null,
    name: null,
  },
  {
    message:
      'fgdrhfhdfgsdgdffggdsfdfjfgsdfdhdhdsdgds stsetewtery r r reyet  y re etrhetfetet t se fwe terhtdf bfgtwe tetjhtgdfhteg d h fgdgfdhdfh',
    user_id: 'QS64t4fe',
    added_on: '2022-10-29T05:50:45.238515Z',
    is_owner: false,
    profile_image: 'crab',
    link: null,
    name: null,
  },
]

const ChatList = () => {
  return (
    <div className='chat--list'>
      {messages.map((msg, idx) => (
        <ChatMessage
          key={idx}
          message={msg.message}
          isOwner={msg.is_owner}
          msgDate={msg.added_on}
        />
      ))}
    </div>
  )
}

export default ChatList
