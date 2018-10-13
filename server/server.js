const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');
const port = process.env.PORT || 3000;
const{generateMessage} = require('./utils/message');

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

//sends to user when joined
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
//sends to all when a user joins
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined!'))

//create a message to send to the user
socket.on('createMessage', (message, callBack) =>{
        io.emit('newMessage', generateMessage(message.from, message.text));
        callBack("This is from the server");
        // socket.broadcast.emit('new', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        console.log('createMessage', message)
    });
 
    //disconnect 
    socket.on('disconnect', () => {
      console.log('User was disconnected');
      socket.broadcast.emit('newMessage', generateMessage('Admin', 'User has left!'))
    });
  });

server.listen(port, (req, res) =>{
    console.log('Chat server is running on ' + port)
})
