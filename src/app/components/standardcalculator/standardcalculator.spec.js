describe('Testing Calculator Service', function () {
	beforeEach(module('calculatorEngine'));

	var calculatorService;

	beforeEach(inject(function (calculatorEngineService) {
		calculatorService = calculatorEngineService;
	}));

	it('1 + 1 should be equal to 2', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('+');
		calculatorService.processInput('1');
		var result = calculatorService.processInput('=');
		expect(result).toBe(2);
	});

	it('1 + 10 should be equal to 11', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('+');
		calculatorService.processInput('1');
		calculatorService.processInput('0');
		var result = calculatorService.processInput('=');
		expect(result).toBe(11);
	});

	it('10 - 1 should be equal to 9', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('0');
		calculatorService.processInput('-');
		calculatorService.processInput('1');
		var result = calculatorService.processInput('=');
		expect(result).toBe(9);
	});

	it('2 * 2 should be equal to 4', function () {
		calculatorService.start();
		calculatorService.processInput('2');
		calculatorService.processInput('*');
		calculatorService.processInput('2');
		var result = calculatorService.processInput('=');
		expect(result).toBe(4);
	});

	it('2 * 0 should be equal to 0', function () {
		calculatorService.start();
		calculatorService.processInput('2');
		calculatorService.processInput('*');
		calculatorService.processInput('0');
		var result = calculatorService.processInput('=');
		expect(result).toBe(0);
	});

	it('100 / 50 should be equal to 2', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('0');
		calculatorService.processInput('0');
		calculatorService.processInput('/');
		calculatorService.processInput('5');
		calculatorService.processInput('0');
		var result = calculatorService.processInput('=');
		expect(result).toBe(2);
	});

});