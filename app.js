
const colorList = ['rgb(204, 0, 0)', 'rgb(0, 204, 0)', 'rgb(0, 0, 204)', 'rgb(255, 255, 0)', 'rgb(128, 128, 0)', 'rgb(255, 128, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)']
const colorTestField = document.querySelector('#colorButtonField')
const colorButtonField = document.querySelector('#colorButtonField > ul')
let numberOfButtons = 0
const startBtn = document.querySelector('#btn-start')
let confirmButton = ''


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
        createButtons(numberOfButtons)}
    }
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
    startBtn.outerHTML = ''
})

