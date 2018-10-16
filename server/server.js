const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');
const port = process.env.PORT || 3000;
const{generateMessage, generateLocationMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')

var app = express();
var server = http.createServer(app) //to use socket.io
var io = socketIO(server);
var users = new Users();

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



//Socket join from login
socket.on('join', (params, callback) =>{
if(!isRealString(params.name) || !isRealString(params.room)){
    callback('Name and room name are required.');
}
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id, params.name, params.room);
//socket.leave(params.room)

io.to(params.room).emit('updateUserList', users.getUserList(params.room))

//sends to user when joined
socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
//sends to all when a user joins
socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`))

callback();


//create a message to send to the user
socket.to(params.room).on('createMessage', (message, callBack) =>{
    var user = users.fetchUser(socket.id)

    if(user&& isRealString(message.text)){
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
        callBack();
    });

    //create location
    socket.to(params.room).on('createLocationMessage', (coords) =>{
        var user = users.fetchUser(socket.id)
        if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude ))
        }
    })
})
    //disconnect 
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
    
        if (user) {
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
      });
    });

server.listen(port, (req, res) =>{
    console.log('Chat server is running on ' + port)
})
