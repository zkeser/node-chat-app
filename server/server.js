const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');
const port = process.env.PORT || 3000;
const{generateMessage, generateLocationMessage} = require('./utils/message');

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

//sends to user when joined
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
//sends to all when a user joins
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined!'))

//create a message to send to the user
socket.on('createMessage', (message, callBack) =>{
        io.emit('newMessage', generateMessage(message.from, message.text));
        callBack();

        console.log('createMessage', message)
    });
 
    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude ))
    })
    //disconnect 
    socket.on('disconnect', () => {
      console.log('User was disconnected');
      socket.broadcast.emit('newMessage', generateMessage('Admin', 'User has left!'))
    });
  });

server.listen(port, (req, res) =>{
    console.log('Chat server is running on ' + port)
})
