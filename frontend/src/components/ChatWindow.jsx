import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// @mui
import { Box, Divider, Stack } from '@mui/material';
import useSocket from '../hooks/useSocket';
import ChatHeader from './ChatHeader';

// ----------------------------------------------------------------------


export default function ChatWindow() {
  const [chatMembers, setChatMembers] = useState([]) 
  const { onlineUsers} = useSocket();

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
        
      <ChatHeader />

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
         
          <Divider />

        </Stack>
      </Box>
    </Stack>
  );
}
