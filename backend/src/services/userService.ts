import bcrypt from 'bcrypt';
import { UserDto } from '../DTOs/UserDtos';

const users: UserDto[] = []

async function signup(data: UserDto) {
  const user = {
      userName: data.userName,
      password: bcrypt.hashSync(data.password, 8),
  }

  if (users.findIndex(user => user.userName === data.userName) !== -1) {
    throw 'user name already existe'
  }

  users.push(user)

  return user.userName;
}


async function signin(data: UserDto) {
  const user = users.find(u => u.userName === data.userName)
  
  if (!user) {
    throw 'user not found'
  }
  
  if(bcrypt.compareSync(data.password, user?.password || '')){
      const {password, ...userWithoutPwd} = user
      return userWithoutPwd;
    }
    else{
      throw 'invalid information';
    }
  }
  
async function getAll() { 
  return users.map(user => ({userName: user.userName}))
}

async function getUser(userName: string) { 
  const user = users.find(u => u.userName === userName)
  
  if (!user) {
    throw 'user not found'
  }
  return {userName}
}

export default {
  signup,
  signin,
  getAll,
  getUser
}
