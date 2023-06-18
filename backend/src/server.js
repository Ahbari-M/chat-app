import express from 'express'
import http from 'http' 
import cors from 'cors';
import router from './routes/user.js';
import expressjwt from 'express-jwt'
import handleError from './shared/handleError.js';
import config from './config.js';

const app = express()
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// use JWT auth to secure the api
app.use( () => {
  const { secret } = config;
  return expressjwt({ secret, algorithms: ['HS256'] }).unless({
      path: [
          // public routes that don't require authentication
          'api/users/signin'
      ]
  });
})

// routes
app.use('/api', router)

// Error handling
app.use(handleError);

export default server 

