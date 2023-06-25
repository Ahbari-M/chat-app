import { Box, Divider, Stack } from '@mui/material';
import ChatHeader from './ChatHeader';


export default function ChatWindow({children}) {

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
        
      <ChatHeader />

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
         
        {children}

        </Stack>
      </Box>
    </Stack>
  );
}
