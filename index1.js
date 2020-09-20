/*jshint esversion: 6 */

// button input to show on innerText of display when pressed or typed. any operators should have spaces before and after.
const easterEggs = {
	69: "nice.",
	"01134": "hello there.",
	1134: "turn me upside down you heathen.",
	50208: "yeah they are a bunch of bozos",
	53045: "nike, adidas, reebok but never attack force.",
};

const easterEggResponses = (code) => {
	updateDisplay(easterEggs[code]);
	setTimeout(() => {
		updateDisplay("");
	}, 3000);
};

const displayFlash = (event) => {
	const buttonPress = event.currentTarget;
	const displayScreen = document.querySelector(".display");

	displayScreen.classList.add("displayFlash");
	setTimeout(() => displayScreen.classList.remove("displayFlash"), 100);
	buttonPress.classList.add("displayFlash");
	setTimeout(() => buttonPress.classList.remove("displayFlash"), 100);
};

const addNumbers = (num1, num2) => {
	return num1 + num2;
};

const multiplyNumbers = (num1, num2) => {
	return num1 * num2;
};

const subtractNumbers = (num1, num2) => {
	return num1 - num2;
};

const divideNumbers = (num1, num2) => {
	if (num2 === 0 || num2 === -0) {
		return NaN;
	} else {
		return num1 / num2;
	}
};

const updateDisplay = (input) => {
	display.innerText = input;
};

const exponentialCheck = (result, operator2) => {
	const checkExpoNm = handleExponential(result);
	if (operator2 !== "=") {
		updateDisplay(`${checkExpoNm} ${operator2}`);
	} else {
		updateDisplay(checkExpoNm);
	}
};

const parseOperators = (num1, operator, num2, operator2) => {
	let result;
	switch (operator) {
		case "+":
			result = addNumbers(num1, num2);
			break;
		case "-":
			result = subtractNumbers(num1, num2);
			break;
		case "×":
			result = multiplyNumbers(num1, num2);
			break;
		case "÷":
			result = divideNumbers(num1, num2);
			break;
	}

	exponentialCheck(result, operator2);
};

const handleZeroInputs = (buttonInput) => {
	if (buttonInput === "-") {
		updateDisplay(buttonInput);
	} else if (!isNaN(buttonInput)) {
		updateDisplay(buttonInput);
	}
};

const handleOneInputs = (buttonInput, firstInput) => {
	if (!isNaN(buttonInput)) {
		updateDisplay(`${display.innerText}${buttonInput} `);
	} else if (firstInput === "-") {
		updateDisplay(`${firstInput}`);
	} else if (buttonInput !== "=") {
		updateDisplay(`${display.innerText} ${buttonInput} `);
	} else if (
		buttonInput === "=" &&
		Object.keys(easterEggs).includes(firstInput)
	) {
		easterEggResponses(firstInput);
	}
};

const handleTwoInputs = (display, buttonInput) => {
	if (!isNaN(buttonInput) || buttonInput === "-") {
		updateDisplay(`${display.innerText} ${buttonInput} `);
	}
};

const handleThreeInputs = (display, thirdInput, buttonInput, displayItems) => {
	if ((thirdInput === "-" || !isNaN(thirdInput)) && !isNaN(buttonInput)) {
		updateDisplay(`${display.innerText}${buttonInput} `);
	} else if (!isNaN(thirdInput) && isNaN(buttonInput)) {
		parseOperators(
			Number(displayItems[0]),
			displayItems[1],
			Number(displayItems[2]),
			buttonInput
		);
	}
};

const inputDisplay = (buttonInput) => {
	const display = document.getElementById("display");
	let displayItems = display.innerText.split(" ");

	if (buttonInput !== "C") {
		if (displayItems.length === 1 && displayItems[0] === "") {
			handleZeroInputs(buttonInput);
		} else if (displayItems.length === 1 && displayItems[0] !== "") {
			handleOneInputs(buttonInput, displayItems[0]);
		} else if (displayItems.length === 2) {
			handleTwoInputs(display, buttonInput);
		} else if (displayItems.length === 3) {
			handleThreeInputs(display, displayItems[2], buttonInput, displayItems);
		}
	}
};

const handleExponential = (input) => {
	if (input[0] > 10000000000) {
		return input.toExponential();
	} else {
		return input;
	}
};

const clearDisplayCheck = (buttonInput) => {
	if (buttonInput === "C") {
		updateDisplay("");
	}
};

const handleButtonPress = (event) => {
	const buttonInput = event.target.innerText;

	clearDisplayCheck(buttonInput);
	displayFlash(event);
	inputDisplay(buttonInput);
};

//This adds an event listener for all the buttons in the arr "buttons"
const addEventListeners = () => {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.addEventListener("click", handleButtonPress);
	});
};

addEventListeners();

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
