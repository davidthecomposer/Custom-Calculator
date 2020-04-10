/*jshint esversion: 6 */



// button input to show on innerText of display when pressed or typed. any operators should have spaces before and after.

const handleClick = (event) => {
    //handleClick Variables
    let buttonPress = event.currentTarget;
    let buttonInput = event.target.innerHTML;
    let display = document.getElementById('display');
    let displayScreen = document.querySelector('.display');


    // when a button is pressed the display glows slightly, and the number lights up. 

    displayScreen.classList.add('displayFlash');
    setTimeout(() => displayScreen.classList.remove('displayFlash'), 100);
    buttonPress.classList.add('displayFlash');
    setTimeout(() => buttonPress.classList.remove('displayFlash'), 100);

    //when pressing '=' it should calculate the result of the sting using eval and accounting for very large numbers with exponential notation.

    if (buttonInput === '=' && eval(display.innerText) >= 10000000000) {
        display.innerText = eval(display.innerText).toExponential();
    } else if (buttonInput === '=') {

        if (display.innerText === '69') {
            display.innerText = 'nice';
        } else if (display.innerText === '01134') {
            display.innerText = 'Hi, there!';
        } else if (display.innerText === '1134') {
            display.innerText = 'Turn me upside down, you heathen...';
        } else {
            display.innerText = eval(display.innerText);
        }
        //could add toLocaleString() above
    } else if (buttonInput === 'C') {
        display.innerText = '';
    } else if (buttonInput === 'x') {
        display.innerText = display.innerText + '*';
    } else if (buttonInput === '÷') {
        display.innerText = display.innerText + '/';
    } else {
        display.innerText = display.innerText + buttonInput;
    }

};

//This adds an event listener for all the buttons in the arr "buttons"
const addEventListener = () => {
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', handleClick);
    });
};

addEventListener();

//Upgrades to attempt:
// round numbers to 2 decimal points?
// add percentage, square root, decimal, +- buttons. 
// make new input when inputting new number after = 
// error message when entering invalid input




//edge idea : if they input bad words then the keyboard could respond with a funny reply? 
// 69= would be 'nice';
// 01134= would be  'Hi there';
//1134 - Turn me upside down you heathen.
//