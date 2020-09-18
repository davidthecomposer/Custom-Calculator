const appURL = "http://localhost:5500";

const calculations = {
	1: "95 + 6 = 101",
	2: "8900 + 6 = 8906",
	3: "1 - 7 = -6",
	4: "-4 × 3 = -12",
	5: "9 ÷ 2 = 4.5",
	6: "-9876543210 + 0 = -9876543210",
};

const clickMultipleElements = (arr) => {
	arr.forEach((el) => {
		cy.get(`[data-cy="${el}"]`).click();
	});
};

const readOutput = (tag, result) => {
	cy.get(`[data-cy="${tag}"]`).then((display) => {
		const text = display.text();

		expect(text).to.include(result);
	});
};

const calcOperation = (testName, inputButtons, inputResult) => {
	it(`${testName} displays correct results`, () => {
		cy.visit(appURL);

		clickMultipleElements(inputButtons);

		readOutput("display", inputResult);
	});
};

const parseOperationName = (operator) => {
	switch (operator) {
		case "+":
			return "Addition";

		case "-":
			return "Subtraction";

		case "×":
			return "Multiplication";

		case "÷":
			return "Division";

		default:
			return "error";
	}
};

const executeCalcOperation = (string) => {
	const commandArray = string.split(" ");
	const [num1, operator1, num2, operator2, result] = commandArray;

	const num1Arr = num1.split("");
	const num2Arr = num2.split("");

	const inputButtons = [...num1Arr, operator1, ...num2Arr, operator2];

	const operationName = parseOperationName(operator1);

	calcOperation(operationName, inputButtons, result);
};

const randomNums = () => {
	const num = Math.floor(Math.random() * 10);
	let numArray = [];
	for (let i = 0; i < num; i++) {
		const randomNum = Math.floor(Math.random() * 10);
		numArray.push(randomNum);
	}
	return numArray;
};

const clearDisplay = () => {
	it("inputs and then clears output", () => {
		cy.visit(appURL);
		const nums = randomNums();

		const clearPattern = [...nums, "C"];

		clickMultipleElements(clearPattern);
		readOutput("display", "");
	});
};

const noOperatorInitialInput = () => {
	it("disallows initial operator input (exception: '-' )", () => {
		cy.visit(appURL);
		const pattern = ["+", "×", "÷", "=", "-"];

		clickMultipleElements(pattern);
		readOutput("display", "-");
	});
};

const CheckTitle = () => {
	it("Checks Title", () => {
		cy.visit(appURL);
		cy.title().should("include", `David's First Calculator`);
	});
};

const noDoubleOperators = (operator) => {
	let pattern = ["2"];
	it(`disallows double ${operator} input`, () => {
		cy.visit(appURL);
		const updatedPattern = [...pattern, operator, operator];
		const result = `${updatedPattern[0]} ${updatedPattern[1]}`;

		clickMultipleElements(updatedPattern);
		readOutput("display", result);
	});
};

describe("Input authentication Tests", () => {
	CheckTitle();
	clearDisplay();
	noOperatorInitialInput();
	noDoubleOperators("+");
	noDoubleOperators("-");
	noDoubleOperators("×");
	noDoubleOperators("÷");
});

describe("Calculation Tests", () => {
	Object.values(calculations).forEach((calculation) => {
		executeCalcOperation(calculation);
	});
	// executeCalcOperation(`95 + 6 = 101`);
	// executeCalcOperation("8900 + 6 = 8906");
	// executeCalcOperation("1 - 7 = -6");
	// executeCalcOperation("-4 × 3 = -12");
	// executeCalcOperation("9 ÷ 2 = 4.5");
	// executeCalcOperation("-9876543210 + 0 = -9876543210");
});
