import express from 'express'
import http from 'http' 

const app = express()
const server = http.createServer(app);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

export default server 

