angular.module('calculatorEngine', [])
    .factory('calculatorEngineService', function () {
        return calculatorEngine;
    });

var calculatorEngine = function () {
    var operand1 = '';
    var operand2 = '';
    var result = 0;
    var displayText = '';
    var currentState;

    function start()
    {
        operand1 = '';
        operand2 = '';
        result = 0;
        displayText = '';
        currentState = getClearState();
        
        return displayText;
    }

    function getClearState() {
        return {
            processInput: function (input) {
                //TODO: bitwise mask
                if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9') {
                    operand1 += input;
                    displayText = operand1;
                    currentState = getDigitPressedState();
                }

                return displayText;
            }
        }
    }

    function getDigitPressedState() {
        return {
            processInput: function (input) {
                if (input === '0' || input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9') {
                    operand1 += input;
                    displayText = operand1;
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    operator = input;
                    currentState = getOperatorPressedState();
                } else if (input === 'C') {
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    displayText = '0';
                    currentState = getClearState();
                }

                return displayText;
            }
        }
    }

    function getOperatorPressedState() {
        return {
            processInput: function (input) {
                if (input === '0' || input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9') {
                    operand2 += input;
                    displayText = operand2;
                    currentState = getDigitsPressedWithPendingOperatorState();
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    operator = input;
                    currentState = getOperatorPressedState();
                } else if (input === 'C') {
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    displayText = '0';
                    currentState = getClearState();
                }

                return displayText;
            }
        }
    }

    function getDigitsPressedWithPendingOperatorState() {
        return {
            processInput: function (input) {
                if (input === '0' || input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9') {
                    operand2 += input;
                    displayText = operand2;
                    currentState = getDigitsPressedWithPendingOperatorState();
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    var op1 = parseInt(operand1);
                    var op2 = parseInt(operand2);

                    if (operator === '+') {
                        result = op1 + op2;
                    } else if (operator === '-') {
                        result = op1 - op2;
                    } else if (operator === '*') {
                        result = op1 * op2;
                    } else if (operator === '/') {
                        result = op1 / op2;
                    }
                    operand1 = result;
                    displayText = operand1;
                    operator = input;
                    currentState = getOperatorPressedState();
                } else if (input === '=') {

                    var op1 = parseInt(operand1);
                    var op2 = parseInt(operand2);

                    if (operator === '+') {
                        result = op1 + op2;
                    } else if (operator === '-') {
                        result = op1 - op2;
                    } else if (operator === '*') {
                        result = op1 * op2;
                    } else if (operator === '/') {
                        result = op1 / op2;
                    }

                    displayText = result;
                    currentState = getCalculateState();
                } else if (input === 'C') {
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    displayText = '0';
                    currentState = getClearState();
                }

                return displayText;
            }
        }
    }

    function getCalculateState() {
        return {
            processInput: function (input) {
                if (input === 'C' || input === '0') {
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    result = 0;
                    displayText = '0';
                    currentState = getClearState();
                } else if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9') {
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    result = 0;
                    displayText = '0';
                    currentState = getDigitPressedState();
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    operand1 = result;
                    operator = input;
                    currentState = getdigitsPressedWithPendingOperatorState();
                }

                return displayText;
            }
        }
    }

    return {
        start: start,
        processInput: function (input) {
            return currentState.processInput(input);
        },
        debug: {
            printOperand1: function () {
                console.log(operand1);
            },
            printOperand2: function () {
                console.log(operand2);
            },
            printResult: function () {
                console.log(displayText);
            }
        }
    }
} ();

/*calculatorEngine.start();
calculatorEngine.processInput('3');
calculatorEngine.debug.printOperand1();
calculatorEngine.processInput('+');
calculatorEngine.processInput('1');
calculatorEngine.debug.printOperand2();
var sum = calculatorEngine.processInput('=');
console.log(sum);
*/