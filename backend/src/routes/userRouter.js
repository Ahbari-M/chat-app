import { Router } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import userService from '../services/userService.js';
import config from '../config.js'
import { verifyToken } from '../shared/jwt.js';

const router = Router()
const { CREATED, OK } = StatusCodes;

router.post('/signup', async (req, res, next) => {
  try {
      const user = req.body;
      const createdUser = await userService.signup(user);
      return res.status(CREATED).json( createdUser);   
  } catch (error) {
      return next(error); 
  }
});

router.put('/signin', async (req, res, next) => {
  try {
      const signInData = req.body;
      const user = await userService.signin(signInData);  
      const token = jwt.sign({ userName: user.userName}, config.secret, { expiresIn: 86400 });
      res.status(OK)
      .json({
        user,
        accessToken: token
      });    

  } catch (error) {
      return next(error);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const users = await userService.getAll()
    return res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/account', async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    const userName  = verifyToken(auth);
    const user = await userService.getUser(userName)
    return res.json({user})
  } catch (error) {
    next(error)
  }
})

export default router