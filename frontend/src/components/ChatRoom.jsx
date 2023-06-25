import React from 'react'
import { useParams } from 'react-router-dom'

function ChatRoom() {
  const {id} = useParams()
  return (
    <div>ChatRoom { id }</div>
  )
}

export default ChatRoom