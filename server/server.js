const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app) //to use socket.io
var io = socketIO(server);

//Set Directory Path
const publicPath= path.join(__dirname,'../public');
app.use(express.static(publicPath))

//Set HBS

app.set('view engine', 'hbs');

//Path demonstration
// console.log(__dirname + '/../public');
// console.log(publicPath)

//IO connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from:'keskes882@yahoo.com',
    //     text:"Hey bro",
    //     createAt: "123"
    // })

    //TEST EMIT TO USER
    // socket.emit('newMessage', {
    //     from: 'John',
    //     text: 'See you then',
    //     createdAt: '123123'

    // });

    socket.on('createMessage', (message) =>{
        console.log('createMessage', message)
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
    });
  
    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
  });

server.listen(port, (req, res) =>{
    console.log('Chat server is running on ' + port)
})
