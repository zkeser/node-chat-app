var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () =>{
    it('should generate a correct message object', () =>{
        var from = 'Z';
        var text = "Some message";
        var message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from,text})
    })
})