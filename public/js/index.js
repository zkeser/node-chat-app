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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li)
})

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url)
    li.append(a);
    $('#messages').append(li)
});
// socket.on('newEmail', function(email) {
//     console.log("New Email", email);
// })

var messageTextbox = $('[name=message');
//submit messages
$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
    
  });
//location via geolocation
  var locationButton = $('#geo')
locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser")
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function(err){
        locationButton.removeAttr('disabled').text('Send location');
        alert("unable to fetch location", err)
    })
    
})

  //clear output
//   $('#clr').click(function(e) {
//       e.preventDefault();
//       $('li').remove();
//   })