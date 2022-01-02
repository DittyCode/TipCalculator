var Tip;
(function (Tip) {
    Tip[Tip["5%"] = 5] = "5%";
    Tip[Tip["10%"] = 10] = "10%";
    Tip[Tip["15%"] = 15] = "15%";
    Tip[Tip["25%"] = 25] = "25%";
    Tip[Tip["50%"] = 50] = "50%";
})(Tip || (Tip = {}));
var billInput = document.querySelector('[data-bill]');
var peopleInput = document.querySelector('[data-people]');
var tipAmount = document.querySelector('[data-amount]');
var tipTotal = document.querySelector('[data-total]');
var tipCustom = document.querySelector('[data-custom]');
var resetButton = document.querySelector('[data-reset]');
var buttons = document.querySelectorAll('[data-tip]');
var values = {
    bill: 0,
    people: 0,
    tip: 0
};
var generateTipValue = function (_a) {
    var target = _a.target;
    var targetTipButton = target;
    var targetTip = targetTipButton.textContent;
    if (targetTip) {
        values.tip = Tip[targetTip];
    }
};
var generateBillValue = function (_a) {
    var target = _a.target;
    var targetBillInput = target;
    var bill = targetBillInput.value;
    if (bill) {
        values.bill = +bill.replace(/,/g, '.');
    }
};
var generatePeopleValue = function (_a) {
    var target = _a.target;
    var targetPeopleInput = target;
    var people = targetPeopleInput.value;
    if (people) {
        values.people = +people;
    }
};
var validValues = function () {
    var valid = [];
    var valuesKey;
    for (valuesKey in values) {
        valid.push(values[valuesKey]);
    }
    return valid;
};
var generateValues = function () {
    var tip = values.tip, people = values.people, bill = values.bill;
    var roundedTip = ((bill * tip) / 100 / people).toFixed(2);
    var total = (+(bill / people).toFixed(2) + +roundedTip).toFixed(2);
    return { total: total, roundedTip: roundedTip };
};
var generateTipCustomValue = function (_a) {
    var target = _a.target;
    var targetTipCustomInput = target;
    values.tip = +targetTipCustomInput.value;
};
var initProject = function () {
    var valuesKey;
    for (valuesKey in values) {
        values[valuesKey] = 0;
    }
    [billInput, peopleInput].forEach(function (input) { return (input.value = ''); });
    [tipAmount, tipTotal].forEach(function (tip) { return (tip.textContent = "$0.00"); });
};
var generateHTML = function () {
    var generatedValidValues = validValues();
    if (generatedValidValues.indexOf(0) === -1) {
        var _a = generateValues(), total = _a.total, roundedTip = _a.roundedTip;
        tipAmount.textContent = roundedTip;
        tipTotal.textContent = total;
    }
};
peopleInput.addEventListener('input', function (e) {
    generatePeopleValue(e);
    generateHTML();
});
billInput.addEventListener('input', function (e) {
    generateBillValue(e);
    generateHTML();
});
tipCustom.addEventListener('input', function (e) {
    generateTipCustomValue(e);
    generateHTML();
});
resetButton.addEventListener('click', function () {
    initProject();
});
buttons.forEach(function (button) {
    return button.addEventListener('click', function (e) {
        generateTipValue(e);
        generateHTML();
    });
});
