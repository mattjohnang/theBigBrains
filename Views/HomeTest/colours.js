// // let jsdom = require('jsdom-global');
// // global.document = jsdom();
// const colorList = ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)']
// const colorTestField = ''
// const colorButtonField = ''
// let numberOfButtons = 0
// const startBtn = ''
// let confirmButton = ''
// let colorCode = []
// let checkButton = ''
// let colorDict = {'rgb(204, 0, 0)': 0, 'rgb(0, 204, 0)': 0, 'rgb(0, 0, 204)': 0, 'rgb(255, 255, 0)': 0, 'rgb(128, 128, 0)': 0, 'rgb(255, 128, 0)': 0, 'rgb(0, 0, 0)': 0, 'rgb(255, 255, 255)': 0}
// let guessCount = 0

// function initializeDifficultySelect() {
//     colorTestField = '<textarea>How many buttons?</textarea><button id="buttonCount">Confirm</button>'
//     confirmButton = '<button id="buttonCount">Confirm</button>'
//     return confirmButton
// }

// function getNumberOfButtons(testUserInput) {
//     // console.log(document.querySelector('textarea').value)
//     userInput = testUserInput
//     if (isNaN(userInput)) {
//         alert("invalid parameter, please input a number")
//     }
//     else {
//         if (userInput < 4 || userInput > 8) {
//             alert('please input a number between 4 and 8')
//         }
//         else {
//         numberOfButtons = userInput
//         colorTestField= ''
//         createButtons(numberOfButtons)
//         generateColorCode(numberOfButtons)
//         checkButton = createCheckButton()
//         }
//     }
// }

// function createCheckButton() {
//     colorTestField += '<button id="check">Check Answer</button>'
//     checkButton = ''
//     checkButton.addEventListener('click', () => {
//         checkAnswers(colorCode, colorTestField)
//     })
//     return checkButton
// }

// function createButtons(numberOfButtons) {
//     for (let i = 0; i < numberOfButtons; i++) {
//         colorTestField += `<button class='button' id='button${i + 1}'></button>`
//         let newButton = `#button${i + 1}`
//         newButton.style.backgroundColor = colorList[0]
//     }
// }

// function colorShift(buttonToChange) {
//     buttonInUse = `#${buttonToChange}`
//     // console.log(colorList.indexOf(buttonInUse.style.backgroundColor))
//     // console.log(buttonInUse.style.backgroundColor)
//     oldColor = colorList.indexOf(buttonInUse.style.backgroundColor)
//     // console.log(colorList.length)
//     if (oldColor + 1 >= colorList.length) {
//         buttonInUse.style.backgroundColor = colorList[0]
//     }
//     else {
//     buttonInUse.style.backgroundColor = colorList[oldColor + 1]
// }
// }

// function generateColorCode(numberOfButtons) {
//     for (let i = 0; i < numberOfButtons; i++) {
//         codeNumber = Math.floor(Math.random()*8)
//         codeEntry = colorList[codeNumber]
//         // console.log(codeEntry)
//         colorDict[codeEntry] += 1
//         colorCode.push(codeEntry)
//     }
//     //To simplify testing, uncomment console.log(colorCode)
//     console.log(colorCode)
//     // console.log(colorDict)
// }

// function checkAnswers(colorCode, colorTestField) {
//     let correctColors = {}
//     let correctPosition = 0
//     let correctColor = 0
//     // console.log(colorTestField, colorCode)
//     // console.log(document.querySelectorAll('.button'))
//     buttonList = '.button'
//     for (let i = 0; i < buttonList.length; i++) {
//         // console.log(buttonList[i])
//         buttonColor = buttonList[i].style.backgroundColor
//         // console.log(buttonColor)
//         // console.log(colorCode.indexOf(buttonColor) != -1)
//         // console.log(buttonColor == colorCode[i])
//         if (colorCode.indexOf(buttonColor) != -1) {
//             if (buttonColor in correctColors) {
//                 if (correctColors[buttonColor] < colorDict[buttonColor]){
//                 correctColors[buttonColor] += 1}
//             }
//             else {
//             correctColors[buttonColor] = 1
//             }
//             if (buttonColor == colorCode[i]) {
//                 correctPosition += 1
//             }
       
//         }
//     }
//     // console.log(correctColors)
//     for (let key in correctColors) {
//         correctColor += correctColors[key]
//     }
//     // console.log(correctPosition, correctColor)
//     alert(correctColor + ' were the right color, ' + correctPosition + ' were in the right position')
//     correctColors = {}
//     correctColor = 0
//     if (correctPosition == numberOfButtons) {
//         winState = true
//         endGame(winState)
//         return winState
//     }
//     else {
//         guessCount += 1
//         if (guessCount == 10) {
//             winState = false
//             endGame(winState)
//             return winState
//         }
//     }
// }

// function endGame(winState) {
//     if (winState == true){
//         alert('You Win!')
//     }
//     else {
//         alert('You Lose!')
//     }
//     colorTestField = ''
//     startBtn = '<button>Start</button>'
//     colorCode = []
//     guessCount = 0
//     for (let key in colorDict) {
//         colorDict[key] = 0
//     }
//     return winState
// }


// function testMocha() {
//     return 'Hello'
// }

// // //Event Listeners
// // colorTestField.addEventListener('click', (e) => {
// //     // console.log(e.target)
// //     // console.log(e.target.className)
// //     if (e.target.className == 'button'){
// //     buttonToChange = e.target.id
// //     // console.log(buttonToChange)
// //     colorShift(buttonToChange)
// //     }
// // })


// // startBtn.addEventListener('click', () => {
// //     confirmButton = initializeDifficultySelect()
// //     confirmButton.addEventListener('click', () => {
// //         getNumberOfButtons()
// //     })
// //     startBtn = ''
// // })


module.exports = {
    colorTestField : '',
    colorButtonField : '',
    numberOfButtons : 0,
    startBtn : '',
    confirmButton : '',
    colorCode : [],
    checkButton : '',
    colorDict : {'rgb(204, 0, 0)': 0, 'rgb(0, 204, 0)': 0, 'rgb(0, 0, 204)': 0, 'rgb(255, 255, 0)': 0, 'rgb(128, 128, 0)': 0, 'rgb(255, 128, 0)': 0, 'rgb(0, 0, 0)': 0, 'rgb(255, 255, 255)': 0},
    guessCount : 0,

    initializeDifficultySelect: function() {
        colorTestField = '<textarea>How many buttons?</textarea><button id="buttonCount">Confirm</button>'
        confirmButton = '<button id="buttonCount">Confirm</button>'
        return confirmButton
    },
    
    getNumberOfButtons: function (testUserInput) {
        // console.log(document.querySelector('textarea').value)
        userInput = testUserInput
        if (isNaN(userInput)) {
            return "invalid parameter, please input a number"
        }
        else {
            if (userInput < 4 || userInput > 8) {
               return 'please input a number between 4 and 8'
            }
            else {
            numberOfButtons = userInput
            colorTestField= ''
            createButtons(numberOfButtons)
            generateColorCode(numberOfButtons)
            checkButton = createCheckButton()
            }
        }
        return userInput
    },
    
    createCheckButton: function () {
        colorTestField += '<button id="check">Check Answer</button>'
        checkButton = ''
        // checkButton.addEventListener('click', () => {
        //     checkAnswers(colorCode, colorTestField)
        // })
        return checkButton
    },
    
    createButtons: function (numberOfButtons) {
        for (let i = 0; i < numberOfButtons; i++) {
            colorTestField += `<button class='button' id='button${i + 1}'></button>`
            let newButton = `#button${i + 1}`
            // newButton.style.backgroundColor = colorList[0]
            return newButton
        }
    },
    
    colorShift: function (buttonToChange) {
        const colorList = ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)']
        buttonInUse = `#${buttonToChange}`
        // console.log(colorList.indexOf(buttonInUse.style.backgroundColor))
        // console.log(buttonInUse.style.backgroundColor)
        oldColor = colorList.indexOf('rgb(0, 204, 0)')
        // console.log(colorList.length)
        if (oldColor + 1 >= colorList.length) {
            return colorList[0 + 1]
        }
        else {
        // buttonInUse.style.backgroundColor = colorList[oldColor + 1]
        return colorList[0]
    }
    },
    
    generateColorCode:function (numberOfButtons) {
        let colorCode = []
        const colorList = ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)']
        let colorDict = {'rgb(204, 0, 0)': 0, 'rgb(0, 204, 0)': 0, 'rgb(0, 0, 204)': 0, 'rgb(255, 255, 0)': 0, 'rgb(128, 128, 0)': 0, 'rgb(255, 128, 0)': 0, 'rgb(0, 0, 0)': 0, 'rgb(255, 255, 255)': 0}
        for (let i = 0; i < numberOfButtons; i++) {
            codeNumber = Math.floor(Math.random()*8)
            codeEntry = colorList[codeNumber]
            // console.log(codeEntry)
            // colorDict[codeEntry] += 1
            colorCode.push(codeEntry)
            
        }
        //To simplify testing, uncomment console.log(colorCode)
        console.log(colorCode)
        // console.log(colorDict)
        return colorCode
        
    },
    
    checkAnswers:function (colorCode, colorTestField, numberOfButtons) {
        let correctColors = {}
        let correctPosition = 0
        let correctColor = 0
        let guessCount = 9
        // console.log(colorTestField, colorCode)
        // console.log(document.querySelectorAll('.button'))
        buttonList = colorCode
        for (let i = 0; i < buttonList.length; i++) {
            // console.log(buttonList[i])
            buttonColor = buttonList[i]
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
        // alert(correctColor + ' were the right color, ' + correctPosition + ' were in the right position')
        correctColors = {}
        correctColor = 0
        if (correctPosition == numberOfButtons) {
            winState = true
            // endGame(winState)
            return winState
        }
        else {
            guessCount += 1
            if (guessCount == 10) {
                winState = false
                // endGame(winState)
                return winState
            }
        }
    },
    
    endGame:function (winState) {
        if (winState == true){
            winState = true
            // alert('You Win!')
        }
        else {
            winState = false
            // alert('You Lose!')
        }
        colorTestField = ''
        startBtn = '<button>Start</button>'
        colorCode = []
        guessCount = 0
        for (let key in colorDict) {
            colorDict[key] = 0
        }
        return winState
    },
    
    
    testMocha:function () {
        return 'Hello'
    }

}