import config from "../config";
import jwt from 'jsonwebtoken'

export function verifyToken(authorization: string | undefined) {

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
      try {
          const tokenUser = jwt.verify(authorization.split(' ')[1], config.secret) as {userName:string};
          return tokenUser.userName;   
      } 
      catch (error) {
          throw {name: 'UnauthorizedError'}; 
      }
  }
  throw {name: 'UnauthorizedError'}; 
};