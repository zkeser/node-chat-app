var moment = require('moment');
var someTimestamp = moment().valueOf();

var generateMessage = (from, text) => {
return {
    from,
    text,
    createdAt: someTimestamp
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: someTimestamp
        }
    };

module.exports ={generateMessage, generateLocationMessage}