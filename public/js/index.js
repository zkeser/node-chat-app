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

//AutoScroll
function scrollToBottom(){
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //Height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


socket.on('newMessage', function(message) {
var formattedTime = moment(message.createdAt).format('h:mm a')
var template = $('#message-template').html();
var html = Mustache.render(template, {
    from:message.from,
    text:message.text,
    createdAt: formattedTime
});

$('#messages').append(html);
scrollToBottom();

})

socket.on('newLocationMessage', function(message){
 var formattedTime = moment(message.createdAt).format('h:mm a')
 var template = $('#location-message-template').html();
 var html = Mustache.render(template, {
    from:message.from,
    url: message.url,
    createdAt:formattedTime
 })
 $('#messages').append(html);
 scrollToBottom();
 
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



