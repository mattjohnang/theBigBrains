// let jsdom = require('jsdom-global');
// global.document = jsdom();
const colorList = ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)']
const colorTestField = document.querySelector('#colorButtonField')
const colorButtonField = document.querySelector('#colorButtonField > ul')
let numberOfButtons = 0
const startBtn = document.querySelector('#btn-start')
const getStatsBtn = document.querySelector("#btn-getstats")
let confirmButton = ''
let colorCode = []
let checkButton = ''
let colorDict = {'rgb(204, 0, 0)': 0, 'rgb(0, 204, 0)': 0, 'rgb(0, 0, 204)': 0, 'rgb(255, 255, 0)': 0, 'rgb(128, 128, 0)': 0, 'rgb(255, 128, 0)': 0, 'rgb(0, 0, 0)': 0, 'rgb(255, 255, 255)': 0}
let guessCount = 0
let winCount = 0
let loseCount = 0
let difficultyList = []
let guessPerWin = []
let localStorageTest = 1
const statsMenu = document.querySelector('#statsMenu')
console.log(window.localStorage)


function initializeDifficultySelect() {
    colorTestField.innerHTML = '<textarea>How many buttons?</textarea><button id="buttonCount">Confirm</button>'
    confirmButton = document.querySelector('#buttonCount')
    return confirmButton
}

function getNumberOfButtons() {
    // console.log(document.querySelector('textarea').value)
    userInput = document.querySelector('textarea').value
    if (isNaN(userInput)) {
        alert("invalid parameter, please input a number")
    }
    else {
        if (userInput < 4 || userInput > 8) {
            alert('please input a number between 4 and 8')
        }
        else {
        numberOfButtons = userInput
        colorTestField.innerHTML= ''
        createButtons(numberOfButtons)
        generateColorCode(numberOfButtons)
        difficultyList.push(numberOfButtons)
        checkButton = createCheckButton()
        }
    }
}

function createCheckButton() {
    colorTestField.innerHTML += '<button id="check">Check Answer</button>'
    checkButton = document.querySelector('#check')
    checkButton.addEventListener('click', () => {
        checkAnswers(colorCode, colorTestField)
    })
    return checkButton
}

function createButtons(numberOfButtons) {
    for (let i = 0; i < numberOfButtons; i++) {
        colorTestField.innerHTML += `<button class='button' id='button${i + 1}'></button>`
        let newButton = document.querySelector(`#button${i + 1}`)
        newButton.style.backgroundColor = colorList[0]
    }
}

function colorShift(buttonToChange) {
    buttonInUse = document.querySelector(`#${buttonToChange}`)
    // console.log(colorList.indexOf(buttonInUse.style.backgroundColor))
    // console.log(buttonInUse.style.backgroundColor)
    oldColor = colorList.indexOf(buttonInUse.style.backgroundColor)
    // console.log(colorList.length)
    if (oldColor + 1 >= colorList.length) {
        buttonInUse.style.backgroundColor = colorList[0]
    }
    else {
    buttonInUse.style.backgroundColor = colorList[oldColor + 1]
}
}

function generateColorCode(numberOfButtons) {
    for (let i = 0; i < numberOfButtons; i++) {
        codeNumber = Math.floor(Math.random()*8)
        codeEntry = colorList[codeNumber]
        // console.log(codeEntry)
        colorDict[codeEntry] += 1
        colorCode.push(codeEntry)
    }
    //To simplify testing, uncomment console.log(colorCode)
    console.log(colorCode)
    // console.log(colorDict)
}

function checkAnswers(colorCode, colorTestField) {
    let correctColors = {}
    let correctPosition = 0
    let correctColor = 0
    // console.log(colorTestField, colorCode)
    // console.log(document.querySelectorAll('.button'))
    buttonList = document.querySelectorAll('.button')
    for (let i = 0; i < buttonList.length; i++) {
        // console.log(buttonList[i])
        buttonColor = buttonList[i].style.backgroundColor
        // console.log(buttonColor)
        // console.log(colorCode.indexOf(buttonColor) != -1)
        // console.log(buttonColor == colorCode[i])
        if (colorCode.indexOf(buttonColor) != -1) {
            if (buttonColor in correctColors) {
                if (correctColors[buttonColor] < colorDict[buttonColor]){
                correctColors[buttonColor] += 1}
            }
            else {
            correctColors[buttonColor] = 1
            }
            if (buttonColor == colorCode[i]) {
                correctPosition += 1
            }
       
        }
    }
    // console.log(correctColors)
    for (let key in correctColors) {
        correctColor += correctColors[key]
    }
    // console.log(correctPosition, correctColor)
    alert(correctColor + ' were the right color, ' + correctPosition + ' were in the right position')
    correctColors = {}
    correctColor = 0
    guessCount += 1
    if (correctPosition == numberOfButtons) {
        winState = true
        endGame(winState)
        return winState
    }
    else {
        if (guessCount == 10) {
            winState = false
            endGame(winState)
            return winState
        }
    }
}

function endGame(winState) {
    if (winState == true){
        alert('You Win!')
        winCount += 1
        guessPerWin.push(guessCount)
    }
    else {
        alert('You Lose!')
        loseCount += 1
    }
    colorTestField.innerHTML = ''
    startBtn.innerHTML = '<button>Start</button>'
    colorCode = []
    guessCount = 0
    for (let key in colorDict) {
        colorDict[key] = 0
    }
}


function testMocha() {
    return 'Hello'
}

function showStats(winCount, loseCount, difficultyList, guessPerWin) {
    let totalDifficulty = 0
    let totalGuess = 0
    if (winCount + loseCount == 0){
        winRate = 0
    }
    else {
        winRate = Math.floor((winCount / (winCount + loseCount))*100)
    }
    if (difficultyList.length > 0 ){
    for (let i in difficultyList) {
        totalDifficulty += parseInt(difficultyList[i])
    }
    avgDifficulty = Math.floor(totalDifficulty / difficultyList.length)
    }
    else {
        avgDifficulty = 0
    }
    if (guessPerWin.length > 0){
    for (let i in guessPerWin) {
        totalGuess += guessPerWin[i]
    }
    avgGuess = Math.floor(totalGuess / guessPerWin.length)
    }
    else {
        avgGuess = 0
    }
    console.log(winRate)
    console.log(difficultyList)
    console.log(guessPerWin)
    statsMenu.innerHTML = `Win Rate: ${winRate}%<br> Average Difficulty: ${avgDifficulty}<br> Average Guesses/Win: ${avgGuess}`
    hideBtn = document.querySelector('#btn-hidestats')
    hideBtn.innerHTML = '<button>Hide Stats</button>'
    hideBtn.addEventListener('click', () => {
        hideStats()
    })
    return hideBtn
    
}

function hideStats() {
    statsMenu.innerHTML = ''
    hideBtn.innerHTML = ''
}

//Event Listeners
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
    showStats(winCount, loseCount, difficultyList, guessPerWin)
    

})



