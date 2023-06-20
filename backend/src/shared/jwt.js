import config from "../config.js";
import jwt from 'jsonwebtoken'

export function verifyToken(authorization) {

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
      try {
          const tokenUser = jwt.verify(authorization.split(' ')[1], config.secret);
          return tokenUser.userName;   
      } 
      catch (error) {
          throw {name: 'UnauthorizedError'}; 
      }
  }
  throw {name: 'UnauthorizedError'}; 
};