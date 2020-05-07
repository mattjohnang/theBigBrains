const assert = require('chai').assert
const mochaTest = require('../colours.js').testMocha

console.log(mochaTest)

describe('App', function(){
    it('app should return hello', function(){
        assert.equal(mochaTest(), 'Hello')
    })
})