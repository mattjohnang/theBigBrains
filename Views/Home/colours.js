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
const statsMenu = document.querySelector('#statsMenu')
let totalDifficulty = 0
let totalGuess = 0
let winRate = 0
let avgDifficulty = 0
let avgGuess = 0
let onlyCorrectColor = 0
let wrongAnswers = 0
let correctPosition = 0
let correctColor = 0


function initializeDifficultySelect() {
    colorTestField.innerHTML = '<textarea>How many buttons?</textarea><button id="buttonCount">Confirm</button>'
    confirmButton = document.querySelector('#buttonCount')
    return confirmButton
}

function getNumberOfButtons() {
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

function printInput(colorTestField) {
    const outputField = document.querySelector('#outputField')
    buttons = colorTestField.querySelectorAll('.button')
    outputField.innerHTML += `<ul id='output${guessCount}'></ul>`
    outputEntry = outputField.querySelector(`#output${guessCount}`)
    // console.log(buttons)
    
    for (let i in buttons) {
        // console.log(buttons[i].outerHTML)
        // console.log(typeof buttons[i].outerHTML)
        if (buttons[i].outerHTML != undefined){
        outputEntry.innerHTML += buttons[i].outerHTML
        }
        
    }
    // console.log(outputField.innerHTML)
    
    return outputField.innerHTML
}


function createButtons(numberOfButtons) {
    for (let i = 0; i < numberOfButtons; i++) {
        colorTestField.innerHTML += `<button class='button' id='button${i + 1}'></button>`
        let newButton = document.querySelector(`#button${i + 1}`)
        newButton.style.backgroundColor = colorList[7]
    }
}

function colorShift(buttonToChange) {
    buttonInUse = colorTestField.querySelector(`#${buttonToChange}`)
    oldColor = colorList.indexOf(buttonInUse.style.backgroundColor)
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
        colorDict[codeEntry] += 1
        colorCode.push(codeEntry)
    }
    //To simplify testing, uncomment console.log(colorCode)
    console.log(colorCode)
}

function checkAnswers(colorCode, colorTestField) {
    correctColor = 0
    correctPosition = 0
    let correctColors = {}
    console.log(correctColor, correctPosition)
    buttonList = colorTestField.querySelectorAll('.button')
    for (let i = 0; i < buttonList.length; i++) {
        buttonColor = buttonList[i].style.backgroundColor
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
    for (let key in correctColors) {
        correctColor += correctColors[key]
    }
    
    printInput(colorTestField)
    console.log(correctColor, correctPosition)
    generateProgressSymbols(correctColor, correctPosition)
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
    correctColors = {}
    correctColor = 0
    correctPosition = 0
}

function generateProgressSymbols(correctColor, correctPosition) {
    onlyCorrectColor = 0
    wrongAnswers = 0
    outputEntry = document.querySelector(`#output${guessCount}`)
    outputEntry.innerHTML += `<div id="progressSymbols${guessCount}"><div>`
    progressSymbols = document.querySelector(`#progressSymbols${guessCount}`)
    progressSymbols.style.display = "inline-block"
    progressSymbols.style.borderLeft = "solid 5px black"
    onlyCorrectColor = correctColor - correctPosition
    wrongAnswers = numberOfButtons - correctColor
    console.log(correctPosition, onlyCorrectColor, wrongAnswers)
    for (let i = 0; i < correctPosition; i++){
        progressSymbols.innerHTML += `<button class="rightPosition"></button>`
    }
    
    for (let i = 0; i < correctColor - correctPosition; i++){
        progressSymbols.innerHTML += `<button class="rightColor"></button>`
    }
    
    for (let i = 0; i < numberOfButtons - correctColor; i++){
        progressSymbols.innerHTML += `<button class="wrong"></button>`
    }
    return progressSymbols.innerHTML
    
}

function endGame(winState) {
    if (winState == true){
        try{
        alert('You Win!')
        }
        catch {
            console.log('window alerts do not exist in node')
        }
        winCount += 1
        guessPerWin.push(guessCount)
    }
    else {
        try {
        alert('You Lose!')
    }
    catch {
        console.log('window alerts do not exist in node')
    }
        loseCount += 1
    }
    colorTestField.innerHTML = ''
    outputField.innerHTML = ''

    startBtn.innerHTML = '<button>Start</button>'
    
    colorCode = []
    guessCount = 0
    for (let key in colorDict) {
        colorDict[key] = 0
    }
    calcStats(winCount, loseCount, difficultyList, guessPerWin)
    progressSymbols.innerHTML = ''
}


function testMocha() {
    return 'Hello'
}

function calcStats(winCount, loseCount, difficultyList, guessPerWin) {
    totalDifficulty = 0
    totalGuess = 0
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
    stats = `[${winRate}, ${avgDifficulty}, ${avgGuess}]`
    return stats
}

function showStats(winRate, avgDifficulty, avgGuess) {
    
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
    return statsMenu.innerHTML
}


module.exports = {
    

    testMocha:function() {
        return 'hello'
    },

    initializeDifficultySelect:function() {
        colorTestField.innerHTML = '<textarea>How many buttons?</textarea><button id="buttonCount">Confirm</button>'
        confirmButton = document.querySelector('#buttonCount')
        return `${confirmButton.outerHTML}`
    },
    
    getNumberOfButtons: function() {
        userInput = document.querySelector('textarea').value
        if (isNaN(userInput)) {
            return undefined
        }
        else {
            if (userInput < 4 || userInput > 8) {
                return undefined
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
    },
    
    createCheckButton:function () {
        colorTestField.innerHTML += '<button id="check">Check Answer</button>'
        checkButton = document.querySelector('#check')
        checkButton.addEventListener('click', () => {
            printInput(colorTestField)
            checkAnswers(colorCode, colorTestField)
            
        })
        return `${checkButton.outerHTML}`
    },
    
    createButtons:function (numberOfButtons) {
        for (let i = 0; i < numberOfButtons; i++) {
            colorTestField.innerHTML += `<button class='button' id='button${i + 1}'></button>`
            let newButton = document.querySelector(`#button${i + 1}`)
            newButton.style.backgroundColor = colorList[0]
            return `${newButton.outerHTML}`
        }
        
    },
    
    colorShift:function (buttonToChange) {
        buttonInUse = colorTestField.querySelector(`#${buttonToChange}`)
        // console.log(buttonInUse)
        oldColor = colorList.indexOf(buttonInUse.style.backgroundColor)
        if (oldColor + 1 >= colorList.length) {
            buttonInUse.style.backgroundColor = colorList[0]
        }
        else {
        buttonInUse.style.backgroundColor = colorList[oldColor + 1]
        return buttonInUse.style.backgroundColor
    }
    },
    
    generateColorCode:function (numberOfButtons) {

        for (let i = 0; i < numberOfButtons; i++) {
            codeNumber = Math.floor(Math.random()*8)
            codeEntry = colorList[codeNumber]
            // console.log(codeEntry)
            colorDict[codeEntry] += 1
            colorCode.push(codeEntry)
        }
        //To simplify testing, uncomment console.log(colorCode)
        // console.log(colorCode)
        return colorCode
    },
    
    checkAnswers:function (colorCode, colorTestField, numberOfButtons) {
        let correctColors = {}
        let correctPosition = 0
        let correctColor = 0
        outputField = document.querySelector('#outputField')
        buttonList = document.querySelectorAll('.button')
        for (let i = 0; i < buttonList.length; i++) {
            // console.log(buttonList[i])
            buttonColor = buttonList[i].style.backgroundColor
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
        for (let key in correctColors) {
            correctColor += correctColors[key]
        }
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
        return false
    },
    
    endGame:function (winState) {
        if (winState == true){
            winCount += 1
            guessPerWin.push(guessCount)
        }
        else {
            loseCount += 1
        }
        colorTestField.innerHTML = ''
        startBtn.innerHTML = '<button>Start</button>'
        colorCode = []
        guessCount = 0
        for (let key in colorDict) {
            colorDict[key] = 0
        }
        calcStats(winCount, loseCount, difficultyList, guessPerWin)
        return winState
        
    },

    calcStats:function(winCount, loseCount, difficultyList, guessPerWin) {
        totalDifficulty = 0
        totalGuess = 0
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
        stats = `[${winRate}, ${avgDifficulty}, ${avgGuess}]`
        return stats
    },
    
    printInput: function(colorTestField) {
        colorTestField = document.querySelector('#colorButtonField')
        const outputField = document.querySelector('#outputField')
        buttons = colorTestField.querySelectorAll('.button')
        outputField.innerHTML += `<ul id='output${guessCount}'></ul>`
        outputEntry = outputField.querySelector(`#output${guessCount}`)
        // console.log(buttons)
        
        for (let i in buttons) {
            // console.log(buttons[i].outerHTML)
            // console.log(typeof buttons[i].outerHTML)
            if (buttons[i].outerHTML != undefined){
            outputEntry.innerHTML += buttons[i].outerHTML
            }
            
        }
        // console.log(outputField.innerHTML)
        
        return outputField.innerHTML
    },

    generateProgressSymbols: function(correctColor, correctPosition) {
        onlyCorrectColor = 0
        wrongAnswers = 0
        outputEntry = document.querySelector(`#output${guessCount}`)
        outputEntry.innerHTML += `<div id="progressSymbols${guessCount}"><div>`
        progressSymbols = document.querySelector(`#progressSymbols${guessCount}`)
        progressSymbols.style.display = "inline-block"
        progressSymbols.style.borderLeft = "solid 5px black"
        onlyCorrectColor = correctColor - correctPosition
        wrongAnswers = numberOfButtons - correctColor
        console.log(correctPosition, onlyCorrectColor, wrongAnswers)
        for (let i = 0; i < correctPosition; i++){
            progressSymbols.innerHTML += `<button class="rightPosition"></button>`
        }
        
        for (let i = 0; i < correctColor - correctPosition; i++){
            progressSymbols.innerHTML += `<button class="rightColor"></button>`
        }
        
        for (let i = 0; i < numberOfButtons - correctColor; i++){
            progressSymbols.innerHTML += `<button class="wrong"></button>`
        }
        return progressSymbols.innerHTML
        
    }
}
