const assert = require('chai').assert
const generateColorCode = require('../colours.js').generateColorCode
const colorShift = require('../colours.js').colorShift
const endGame = require('../colours.js').endGame
const testMocha = require('../colours.js').testMocha
const checkAnswers = require('../colours.js').checkAnswers



describe('App', function(){
    it('app should return hello', function() {
        assert.equal(testMocha(), 'Hello')
    })
    it('app should return an array containing random rgb values', function(){
        assert.isArray(generateColorCode(8))
        
    })
    it('app should return a string containing an rgb color value', function() {
        assert.isString(colorShift('button'))
    })
    it('app should return a boolean value'), function(){
        assert.isBoolean(endGame(true))
    }
    it('app should return a true boolean', function() {
        assert.equal(checkAnswers(['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'], ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'], 8), true)
    })
    it('app should return a false boolean', function() {
        assert.equal(checkAnswers([''], ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)'], 8), false)
    })

})