import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// @mui
import { Box, Divider, Stack } from '@mui/material';

// ----------------------------------------------------------------------


export default function ChatWindow() {

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
        


      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
         
          <Divider />

        </Stack>
      </Box>
    </Stack>
  );
}
