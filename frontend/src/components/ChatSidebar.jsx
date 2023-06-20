import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton, useMediaQuery, Avatar } from '@mui/material';
// redux
// import { useSelector } from '../../../redux/store';
// // hooks
// import useResponsive from '../../../hooks/useResponsive';
// // utils
// import axios from '../../../utils/axios';
// // routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// // components
// import Iconify from '../../../components/Iconify';
// import Scrollbar from '../../../components/Scrollbar';
// //
// import ChatAccount from './ChatAccount';
// import ChatSearchResults from './ChatSearchResults';
// import ChatContactSearch from './ChatContactSearch';
// import ChatConversationList from './ChatConversationList';

// ----------------------------------------------------------------------
const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.darker,
  },
}));

const openedMixin = (theme) => ({
  width: SIDEBAR_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  position: 'static',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  position: 'static',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// ----------------------------------------------------------------------



export default function ChatSidebar() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
  const isCollapse = isDesktop && !openSidebar;

  return (
    <>
    {!isDesktop && (
       <IconButton onClick={() => setOpenSidebar(prev => !prev)}>
         {openSidebar ? 'closE' : 'opeN'}
      </IconButton>
    )}

    {isDesktop ? (
      <Drawer
          open={openSidebar}
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            ...(!isCollapse && {
              ...openedMixin(theme),
              '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(isCollapse && {
              ...closedMixin(theme),
              '& .MuiDrawer-paper': closedMixin(theme),
            }),
          }}
      >
        <DrawerContent isCollapse={isCollapse} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      </Drawer>
    ) : (
      <Drawer
        ModalProps={{ keepMounted: true }}
        open={openSidebar}
        onClose={()=> setOpenSidebar(false)}
        sx={{
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
        }}
      >
        <DrawerContent isCollapse={isCollapse} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      </Drawer>
    )}
  </>
  );
}

const DrawerContent = ({ isCollapse, openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          {!isCollapse && (
            <>
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ cursor: 'pointer', width: 48, height: 48 }} />
                {/* <BadgeStatus status={status} sx={{ position: 'absolute', bottom: 2, right: 2 }} /> */}
              </Box>
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <IconButton onClick={() => setOpenSidebar(prev => !prev)}>
            {openSidebar ? 'close' : 'open'}
          </IconButton>

          {!isCollapse && (
            <IconButton onClick={() => navigate('chat.new')}>
              new chat
            </IconButton>
          )}
        </Stack>
      </Box>

   
    </>
  )
};
