//Jan 1st 1970 00:00:00 am UTC
//in milliseconds

// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth())

const moment = require('moment');

var date = moment();
console.log(date.format('MMM Do YYYY hh:mm:ss A'))

var someTimestamp = moment().valueOf();
console.log(someTimestamp)


var createdAt = 1234
var dates= moment(createdAt)
console.log(dates)