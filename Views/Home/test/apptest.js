const assert = require('chai').assert
require('jsdom-global')()
require('jsdom')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <title>Mastermind Game</title>
</head>
<body>
    <div id='colorChangeTest'>
        <ul id='colorButtonField'>

        </ul>
    </div>
    <div id="btn-start">
        <button type="button">Start</button>
    </div>

</body>
    <footer>
        <button id="btn-getstats">Get Stats</button>
        <a href="statspage.html"><button id="statsWebPage">Get Stats (webpage)</button></a>

        <div id="statsMenu">

        </div>
        
        <div id="btn-hidestats"></div>
    </footer>
    <script src= "colours.js" >
        
    </script>
    <script>
        window.localStorage["winRate"] = winRate
window.localStorage["avgDifficulty"] = avgDifficulty
window.localStorage["avgGuess"] = avgGuess
        colorTestField.addEventListener('click', (e) => {
    // console.log(e.target)
    // console.log(e.target.className)
    if (e.target.className == 'button'){
    buttonToChange = e.target.id
    // console.log(buttonToChange)
    colorShift(buttonToChange)
    }
})


startBtn.addEventListener('click', () => {
    confirmButton = initializeDifficultySelect()
    confirmButton.addEventListener('click', () => {
        getNumberOfButtons()
    })
    startBtn.innerHTML = ''
})

getStatsBtn.addEventListener('click', () => {
    showStats(winRate, avgDifficulty, avgGuess)
    

})
    </script>
    <!-- <script src="test/apptest.js"></script> -->
</html>
`);
// console.log(dom)
const { window } = dom;
global.window = window
global.document = window.document
// console.log(dom.serialize())
// console.log(document)
// console.log(dom.window.document.querySelector("#colorButtonField").outerHTML)
colorTestField = dom.window.document.querySelector("#colorButtonField")
startBtn = dom.window.document.querySelector('#btn-start')
getStatsBtn = dom.window.document.querySelector("#btn-getstats")
buttonInUse = dom.window.document.querySelector(`#button1`)
window.alert = () => {}
// console.log(colorTestField)
const generateColorCode = require('../colours.js').generateColorCode
const colorShift = require('../colours.js').colorShift
const endGame = require('../colours.js').endGame
const testMocha = require('../colours.js').testMocha
const checkAnswers = require('../colours.js').checkAnswers
const createCheckButton = require('../colours.js').createCheckButton
const createButtons = require('../colours.js').createButtons
const initializeDifficultySelect = require('../colours.js').initializeDifficultySelect



describe('App', function(){
    it('app should return hello', function() {
        assert.equal(testMocha(), 'hello')
    })
    it('app should return an array containing random rgb values', function(){
        assert.isArray(generateColorCode(8))
        
    })

    it('app should return a boolean value', function(){
        assert.isBoolean(endGame(true))
    })
    it('app should return a true boolean', function() {
        colorTestField.innerHTML += '<button class="button" id="button1" style="background-color: rgb(204, 0, 0);"></button><button class="button" id="button2" style="background-color: rgb(204, 0, 0);"></button><button class="button" id="button3" style="background-color: rgb(204, 0, 0);"></button><button class="button" id="button4" style="background-color: rgb(204, 0, 0);"></button><button id="check">Check Answer</button>'
        assert.equal(checkAnswers(['rgb(204, 0, 0)', 'rgb(204, 0, 0)', 'rgb(204, 0, 0)', 'rgb(204, 0, 0)'], colorTestField, 4), true)
    })
    it('app should return a false boolean', function() {
        assert.equal(checkAnswers(['rgb(0, 0, 0)', 'rgb(0, 0, 0)'], ['rgb(204, 0, 0)', 'rgb(204, 0, 0)'], 2), false)
    })
    it('app should return a string value containing <button id="check">Check Answer</button>', function() {
        assert.equal(createCheckButton(), `<button id="check">Check Answer</button>`)
    })
    it('app should return a string containing #button1', function() {
        assert.equal(createButtons(1), '<button class="button" id="button1" style="background-color: rgb(204, 0, 0);"></button>')
    })
    it('app should return a string containing <button id="buttonCount">Confirm</button>', function() {
        assert.equal(initializeDifficultySelect(), '<button id="buttonCount">Confirm</button>')
    })
    it('app should return a string containing an rgb color value', function() {
        createButtons(1)
        assert.isString(colorShift('button1'))
    })

})