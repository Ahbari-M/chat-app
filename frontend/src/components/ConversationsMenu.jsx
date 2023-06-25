import React from "react";
import useSocket from "../hooks/useSocket";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ConversationsMenu = ({ ...other }) => {
  const { rooms, onlineUsers } = useSocket();
  const navigate = useNavigate();

  return (
    <List disablePadding {...other}>
      {rooms.map((room, index) => {
        const isGroup = room.people.length > 1;

        return (
          <ListItem key={room.id} onClick={() => navigate('/chat/'+ room.id)}>
            <ListItemAvatar>
              {isGroup ? (
                <AvatarGroup total={room.people.length}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </AvatarGroup>
              ) : (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  online={onlineUsers.findIndex(u => u === room.people[0])}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </StyledBadge>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={room.people[0] + ", " + room.people[1] + "..."}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const StyledBadge = styled(Badge)(({ theme, online = true }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: online ? "#44b700" : "transparent",
    ...(online && {
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    }),
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      ...(online && {
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
      }),
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
