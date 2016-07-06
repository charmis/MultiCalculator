angular.module('calculatorEngine', [])
    .factory('calculatorEngineService', function () {
        return new CalculatorEngine();
    });


function CalculatorEngine() {
    var currentState = new ClearState('C');

    this.processInput = function (input) {
        if (currentState != null || currentState != undefined) {
            currentState.processInput(input);
        }
    }
}

var calculatorStateBase = {
    operand1: '',
    operand2: '',
    operator: '',
    result: 0,
    displayText: ''
};

function ClearState() {
    this.processInput = function (input) {
        if (input === '1' || input === '2' || input === '3' || input === '4') {
            this.operand1 += input;
            this.displayText = this.operand1;
            this.currentState = new DigitPressedState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
    }
}

function DigitPressedState() {
    this.processInput = function (input) {
        if (input === '1' || input === '2' || input === '3' || input === '4') {
            this.operand1 += input;
            this.displayText = this.operand1;
            this.currentState = new DigitPressedState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === '+' || input === '-' || input === '*' || input === '/') {
            this.operator = input;
            this.currentState = new OperatorPressedState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === 'C') {
            this.operand1 = '';
            this.operand2 = '';
            this.operator = '';
            this.displayText = '0.0';
            this.currentState = new ClearState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
    }
}

function OperatorPressedState() {
    this.processInput = function (input) {
        if (input === '0' || input === '1' || input === '2' || input === '3' || input === '4') {
            this.operand2 += input;
            this.displayText = this.operand2;
            this.currentState = new DigitsPressedWithPendingOperatorState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === '+' || input === '-' || input === '*' || input === '/') {
            this.operator = input;
            this.currentState = new OperatorPressedState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === 'C') {
            this.operand1 = '';
            this.operand2 = '';
            this.operator = '';
            this.displayText = '0.0';
            this.currentState = new ClearState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
    }
}

function DigitsPressedWithPendingOperatorState() {
    this.processInput = function (input) {
        if (input === '0' || input === '1' || input === '2' || input === '3' || input === '4') {
            this.operand2 += input;
            this.displayText = this.operand2;
            this.currentState = new DigitsPressedWithPendingOperatorState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === '+' || input === '-' || input === '*' || input === '/') {
            var op1 = parseInt(this.operand1);
            var op2 = parseInt(this.operand2);
            var result = 0;
            if (this.operator === '+') {
                result = op1 + op2;
            }
            else if (this.operator === '-') {
                result = op1 - op2;
            }
            else if (this.operator === '*') {
                result = op1 * op2;
            }
            else if (this.operator === '/') {
                result = op1 / op2;
            }
            this.operand1 = result;
            this.displayText = this.operand1;
            this.operator = input;
            this.currentState = new OperatorPressedState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === '=') {
            var op1 = parseInt(this.operand1);
            var op2 = parseInt(this.operand2);
            var result = 0;
            if (this.operator === '+') {
                result = op1 + op2;
            }
            else if (this.operator === '-') {
                result = op1 - op2;
            }
            else if (this.operator === '*') {
                result = op1 * op2;
            }
            else if (this.operator === '/') {
                result = op1 / op2;
            }

            this.result = result;
            this.displayText = result;
            this.currentState = new CalculateState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === 'C') {
            this.operand1 = '';
            this.operand2 = '';
            this.operator = '';
            this.displayText = '0.0';
            this.currentState = new ClearState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
    }
}

function CalculateState() {
    this.processInput = function (input) {
        if (input === 'C' || input === '0') {
            this.operand1 = '';
            this.operand2 = '';
            this.operator = '';
            this.result = 0;
            this.displayText = '0.0';
            this.currentState = new ClearState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === '1' || input === '2') {
            this.operand1 = '';
            this.operand2 = '';
            this.operator = '';
            this.result = 0;
            this.displayText = '0.0';
            this.currentState = new DigitPressedState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
        else if (input === '+' || input === '-' || input === '*' || input === '/') {
            this.operand1 = this.result;
            this.operator = input;
            this.currentState = new DigitsPressedWithPendingOperatorState();
            Object.setPrototype(this.c.currentState, calculatorStateBase);
        }
    }
}