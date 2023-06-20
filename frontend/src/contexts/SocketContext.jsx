import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getAuthToken } from '../utils/jwt';

const SocketContext = createContext({
  id: '',
  rooms: [],
  onlineUsers: [],
  msgs: {},
  newChat: null ,
  sendMsg: null,
  socket: null
});

const SOCKET_URL = 'http://localhost:3005';

const getSocket = () => {
  const token = getAuthToken(); // get jwt token from local storage or cookie
  if (token) {
    return io(SOCKET_URL, {
      auth: { token: `Bearer ${token}` }
    });
  }
  return io(SOCKET_URL);
};

const socket = getSocket()

const SocketProvider = ({ children }) => {
  const [id, setId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [msgs, setMsgs] = useState({})

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {setId(socket.id)})
    socket.on('online-users', ({ users }) => setOnlineUsers(users));
    socket.on('new-room', (room) => setRooms(prev => [...prev, room]));
    socket.on('chat-message', ({ message, name, room }) => setMsgs(prev => ({ ...prev, room: [...prev[room], { message, name }] })));
    
    return () => {
      socket.off('connect')
      socket.off('online-users')
      socket.off('new-room')
      socket.off('chat-message')
      socket.disconnect()
    };
  }, []);

  useEffect(() => {
      if (!!getAuthToken() && !socket.connected) {
        socket.connect()
      }
  }, [getAuthToken()]);


  const newChat = (users) => {
    socket.emit('new-chat', users)
  }

  const sendMsg = ({to, message}) => {
    socket.emit('send-chat-message', { room: to, message })
    setMsgs(prev => ({...prev, room: [...prev[to], {message, name: socket.id}]}))
  }

  return (
    <SocketContext.Provider value={{
      id,
      rooms,
      onlineUsers,
      msgs,
      newChat,
      sendMsg,
      socket
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };