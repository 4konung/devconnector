import React from 'react'
import ChatWindowLayout from './ChatWindowLayout'
import MessageItem from './MessageItem'

export default ({messages}) => {
  return (
    <ChatWindowLayout>
      {
        messages.map((message, idx) => (<MessageItem key={idx} message={message}/>))
      }
    </ChatWindowLayout>
  )
}
