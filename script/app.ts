interface Values {
	bill: number;
	people: number;
	tip: number;
}

enum Tip {
	'5%' = 5,
	'10%' = 10,
	'15%' = 15,
	'25%' = 25,
	'50%' = 50,
}

const billInput = document.querySelector('[data-bill]') as HTMLInputElement;
const peopleInput = document.querySelector('[data-people]') as HTMLInputElement;
const tipAmount = document.querySelector('[data-amount]') as HTMLHeadingElement;
const tipTotal = document.querySelector('[data-total]') as HTMLHeadingElement;
const tipCustom = document.querySelector('[data-custom]') as HTMLInputElement;
const resetButton = document.querySelector('[data-reset]') as HTMLButtonElement;

const buttons = document.querySelectorAll('[data-tip]');

const values: Values = {
	bill: 0,
	people: 0,
	tip: 0,
};

const generateTipValue = ({ target }: Event) => {
	const targetTipButton = target as HTMLButtonElement;
	const targetTip = targetTipButton.textContent;
	if (targetTip) {
		values.tip = Tip[targetTip];
	}
};

const generateBillValue = ({ target }: Event) => {
	const targetBillInput = target as HTMLInputElement;
	const bill = targetBillInput.value;
	if (bill) {
		values.bill = +bill.replace(/,/g, '.');
	}
};

const generatePeopleValue = ({ target }: Event) => {
	const targetPeopleInput = target as HTMLInputElement;
	const people = targetPeopleInput.value;
	if (people) {
		values.people = +people;
	}
};

const validValues = () => {
	const valid = [];
	let valuesKey: keyof typeof values;
	for (valuesKey in values) {
		valid.push(values[valuesKey]);
	}
	return valid;
};

const generateValues = () => {
	const { tip, people, bill } = values;
	const roundedTip = ((bill * tip) / 100 / people).toFixed(2);
	const total = (+(bill / people).toFixed(2) + +roundedTip).toFixed(2);
	return { total, roundedTip };
};

const generateTipCustomValue = ({ target }: Event) => {
	const targetTipCustomInput = target as HTMLInputElement;
	values.tip = +targetTipCustomInput.value;
};

const initProject = () => {
	let valuesKey: keyof typeof values;
	for (valuesKey in values) {
		values[valuesKey] = 0;
	}
	[billInput, peopleInput].forEach(input => (input.value = ''));
	[tipAmount, tipTotal].forEach(tip => (tip.textContent = `$0.00`));
};

const generateHTML = () => {
	const generatedValidValues = validValues();
	if (generatedValidValues.indexOf(0) === -1) {
		const { total, roundedTip } = generateValues();
		tipAmount.textContent = roundedTip;
		tipTotal.textContent = total;
	}
};

peopleInput.addEventListener('input', e => {
	generatePeopleValue(e);
	generateHTML();
});

billInput.addEventListener('input', e => {
	generateBillValue(e);
	generateHTML();
});

tipCustom.addEventListener('input', e => {
	generateTipCustomValue(e);
	generateHTML();
});

resetButton.addEventListener('click', () => {
	initProject();
});

buttons.forEach(button =>
	button.addEventListener('click', e => {
		generateTipValue(e);
		generateHTML();
	})
);
