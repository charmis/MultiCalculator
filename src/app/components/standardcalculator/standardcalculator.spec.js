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


it('2 * 2 should be equal to 4', function () {
		calculatorService.start();
		calculatorService.processInput('2');
		calculatorService.processInput('*');
		calculatorService.processInput('2');
		var result = calculatorService.processInput('=');
		expect(result).toBe(4);
	});

});