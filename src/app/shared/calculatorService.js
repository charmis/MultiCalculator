angular.module('calculatorEngine', [])
    .factory('calculatorEngineService', function () {
        return calculatorEngine;
    });

var calculatorEngine = function () {
    var operand1 = '';
    var operand2 = '';
    var result = 0;
    var displayText = '0';
    var currentState;
    var inMemoryValue = 0;

    var FLAG_ONE = 1;
    var FLAG_TWO = 2;
    var FLAG_THREE = 4;
    var FLAG_FOUR = 8;
    var FLAG_FIVE = 16;
    var FLAG_SIX = 32;
    var FLAG_SEVEN = 64;
    var FLAG_EIGHT = 128;
    var FLAG_NINE = 256;

    var mask = FLAG_ONE | FLAG_TWO | FLAG_THREE | FLAG_FOUR | FLAG_FIVE | FLAG_SIX | FLAG_SEVEN | FLAG_EIGHT | FLAG_NINE;

    function reset() {
        operand1 = '';
        operand2 = '';
        result = 0;
        displayText = '0';
    }

    function start() {
        reset();
        currentState = getClearState();

        return displayText;
    }

    function getClearState() {
        return {
            processInput: function (input) {
                if (input & mask) {
                    operand1 += input;
                    displayText = operand1;
                    currentState = getDigitPressedState();
                }
                else if (input === 'MR') {
                    operand1 = inMemoryValue;
                    displayText = operand1;
                    currentState = getDigitPressedState();
                }
                else if (input === 'MC') {
                    inMemoryValue = 0;
                }

                return displayText;
            }
        }
    }

    function getDigitPressedState() {
        return {
            processInput: function (input) {
                if (input === '0' || (input & mask)) {
                    operand1 += input;
                    displayText = operand1;
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    operator = input;
                    currentState = getOperatorPressedState();
                } else if (input === 'C') {
                    reset();
                    currentState = getClearState();
                }
                else if (input === 'M+') {
                    inMemoryValue = inMemoryValue + parseInt(displayText);
                }
                else if (input === 'M-') {
                    inMemoryValue = inMemoryValue - parseInt(displayText);
                }
                else if (input === 'MR') {
                    operand1 = inMemoryValue;
                    displayText = operand1;
                }
                else if (input === 'MC') {
                    inMemoryValue = 0;
                }

                return displayText;
            }
        }
    }

    function getOperatorPressedState() {
        return {
            processInput: function (input) {
                if (input === '0' || (input & mask)) {
                    operand2 += input;
                    displayText = operand2;
                    currentState = getDigitsPressedWithPendingOperatorState();
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    operator = input;
                    currentState = getOperatorPressedState();
                } else if (input === 'C') {
                    reset();
                    currentState = getClearState();
                }
                else if (input === 'M+') {
                    inMemoryValue = inMemoryValue + parseInt(displayText);
                }
                else if (input === 'M-') {
                    inMemoryValue = inMemoryValue - parseInt(displayText);
                }
                else if (input === 'MR') {
                    operand2 = inMemoryValue;
                    displayText = inMemoryValue;
                    currentState = getDigitsPressedWithPendingOperatorState();
                }
                else if (input === 'MC') {
                    inMemoryValue = 0;
                }

                return displayText;
            }
        }
    }

    function getDigitsPressedWithPendingOperatorState() {
        return {
            processInput: function (input) {
                if (input === '0' || (input & mask)) {
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
                    operand1 = result.toString();
                    operand2 = '';
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

                    displayText = result.toString();
                    currentState = getCalculateState();
                } else if (input === 'C') {
                    reset();
                    currentState = getClearState();
                }
                else if (input === 'M+') {
                    inMemoryValue = inMemoryValue + parseInt(displayText);
                }
                else if (input === 'M-') {
                    inMemoryValue = inMemoryValue - parseInt(displayText);
                }
                else if (input === 'MR') {
                    operand2 = inMemoryValue;
                    displayText = operand2;
                    currentState = getDigitsPressedWithPendingOperatorState();
                }
                else if (input === 'MC') {
                    inMemoryValue = 0;
                }

                return displayText;
            }
        }
    }

    function getCalculateState() {
        return {
            processInput: function (input) {
                if (input === 'C' || input === '0') {
                    reset();
                    currentState = getClearState();
                } else if (input & mask) {
                    reset();
                    currentState = getDigitPressedState();
                } else if (input === '+' || input === '-' || input === '*' || input === '/') {
                    operand1 = displayText;
                    operand2 = '';
                    operator = input;
                    currentState = getDigitsPressedWithPendingOperatorState();
                } else if (input === 'M+') {
                    inMemoryValue = inMemoryValue + parseInt(displayText);
                }
                else if (input === 'M-') {
                    inMemoryValue = inMemoryValue - parseInt(displayText);
                }
                else if (input === 'MR') {
                    displayText = inMemoryValue;
                }
                else if (input === 'MC') {
                    inMemoryValue = 0;
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