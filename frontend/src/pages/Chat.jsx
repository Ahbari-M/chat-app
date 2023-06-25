import { Card, Container } from '@mui/material'
import React from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import useSocket from '../hooks/useSocket'
import { Outlet } from 'react-router-dom'

function Chat() {
  const chat = useSocket() 
  console.log(chat)
  
  return (
    
      <Container>
        <Card sx={{ height: '72vh', display: 'flex', mt:6 }}>
          <ChatSidebar />
          <ChatWindow>
            <Outlet />
          </ChatWindow>
        </Card>
      </Container>
  )
}

export default Chat