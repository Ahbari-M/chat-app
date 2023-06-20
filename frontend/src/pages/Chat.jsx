import { Card, Container } from '@mui/material'
import React from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import { SocketProvider } from '../contexts/SocketContext'
import useSocket from '../hooks/useSocket'

function Chat() {
  const chat = useSocket() 
  console.log(chat)
  
  return (
    
      <Container>
        <Card sx={{ height: '72vh', display: 'flex', mt:6 }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
  )
}

export default Chat