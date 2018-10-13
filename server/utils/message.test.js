var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () =>{
    it('should generate a correct message object', () =>{
        var from = 'Z';
        var text = "Some message";
        var message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from,text})
    })
})

describe('generateLocationMessage', () =>{
    it('should generate correct location of user', () =>{
        var from ='Deb';
        var latitude=15;
        var longitude=16;
        var url = 'https://www.google.com/maps?q=15,16';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});