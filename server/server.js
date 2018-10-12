const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;

var app = express();

//Set Directory Path
const publicPath= path.join(__dirname,'../public');
app.use(express.static(publicPath))

//Set HBS

app.set('view engine', 'hbs');

//Path demonstration
console.log(__dirname + '/../public');
console.log(publicPath)

// GET '/' route 
app.get('/', (req, res) =>{
    res.render('index.html')
})

app.listen(port, (req, res) =>{
    console.log('Chat server is running on ' + port)
})