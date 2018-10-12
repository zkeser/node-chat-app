var socket = io();
      
socket.on('connect', function() {
  console.log('Connected to server');

  //TEST Emits
//   socket.emit('createEmail', {
//       to:"example.example.com",
//       text: "yo yo yo"
//   })

// socket.emit('createMessage', {
//     from: 'Z',
//     text: "Yup, that works for me"
// })
 });

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message)
})
// socket.on('newEmail', function(email) {
//     console.log("New Email", email);
// })