import express from 'express'
import http from 'http' 
import { Server } from 'socket.io'
import cors from 'cors';
import router from './routes/api.js';
import {expressjwt} from 'express-jwt'
import handleError from './shared/handleError.js';
import config from './config.js';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { verifyToken } from './shared/jwt.js';

const {secret} = config
const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      allowedHeaders: ['http://localhost:3000'],
      credentials: true
    }
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// attach io instance to req object
app.use((req,res,next) => {
    req.io = io;
    next();
})
    
// use JWT auth to secure the api
app.use(expressjwt({ secret, algorithms: ['HS256'] }).unless({
      path: [
          // public routes that don't require authentication
          '/api/users/signin',
          '/api/users/signup',
          '/api/users/all'
      ]
  })
)

// routes
app.use('/api', router)

const USERS = {}

io.use(async (socket, next) => {
    try {
        const userName = verifyToken(socket.handshake.auth.token); 

        USERS[userName] = {socket, rooms: []};
        socket.broadcast.emit('online-users',{users: Object.keys(USERS)}); 
        socket.emit('online-users',{users: Object.keys(USERS)}); 
        console.log(`${userName} has connected `, Object.keys(USERS));
        next();
    } catch (error) {
        // console.log({error})
        socket.disconnect();
    }
})

io.on('connection', socket => {
    const userName = verifyToken(socket.handshake.auth.token);
    socket.on('new-chat', (chatUsers) => {
        const room = {id: uuid() , people: [userName,...chatUsers]};
        socket.join(room.id)
        USERS[userName].rooms.push(room);
        chatUsers.forEach(u => {
            const user = USERS[u];
            user.socket.join(room.id)
            user.rooms.push(room)
        });
        
        socket.to(room.id).emit('new-room', room )
    })

    socket.on('send-chat-message', ({room, message}) => {
      socket.to(room).emit('chat-message', { message: message, name: userName, room })
    })

    socket.on('disconnect', () => {
        USERS[userName]?.rooms.forEach(room => {
            socket.to(room.id).emit('chat-message', { message: userName+'user discnnected', name: 'app', room })
        })
        USERS[userName] = undefined
        socket.broadcast.emit('online-users',{users: Object.keys(USERS)});
    })

    socket.on("error", (err) => {
        if (err && err.message === "unauthorized event") {
            socket.disconnect();
        }
      });
})

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });

// Error handling
app.use(handleError);

export default server 

