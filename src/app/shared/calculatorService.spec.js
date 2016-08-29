describe('Testing Calculator Service', function () {
	beforeEach(module('calculatorEngine'));

	var calculatorService;

	beforeEach(inject(function (calculatorEngineService) {
		calculatorService = calculatorEngineService;
	}));

	it('Pressing keys 1 and then 2 should display 12', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		var result = calculatorService.processInput('2');
		expect(result).toBe('12');
	});

	it('Pressing keys 1 and then + and then 5 should display 5', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('+');
		var result = calculatorService.processInput('5');
		expect(result).toBe('5');
	});

	it('Pressing keys 0 and then 5 should display 5', function () {
		calculatorService.start();
		calculatorService.processInput('0');
		var result = calculatorService.processInput('5');
		expect(result).toBe('5');
	});

	it('1 + 1 should be equal to 2', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('+');
		calculatorService.processInput('1');
		var result = calculatorService.processInput('=');
		expect(result).toBe('2');
	});

	it('1 + 10 should be equal to 11', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('+');
		calculatorService.processInput('1');
		calculatorService.processInput('0');
		var result = calculatorService.processInput('=');
		expect(result).toBe('11');
	});

	it('10 - 1 should be equal to 9', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('0');
		calculatorService.processInput('-');
		calculatorService.processInput('1');
		var result = calculatorService.processInput('=');
		expect(result).toBe('9');
	});

	it('2 * 2 should be equal to 4', function () {
		calculatorService.start();
		calculatorService.processInput('2');
		calculatorService.processInput('*');
		calculatorService.processInput('2');
		var result = calculatorService.processInput('=');
		expect(result).toBe('4');
	});	

	it('2 * 0 should be equal to 0', function () {
		calculatorService.start();
		calculatorService.processInput('2');
		calculatorService.processInput('*');
		calculatorService.processInput('0');
		var result = calculatorService.processInput('=');
		expect(result).toBe('0');
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
		expect(result).toBe('2');
	});

	it('pressing "C" should clear the dislay and set value 0', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('0');
		calculatorService.processInput('0');
		var result = calculatorService.processInput('C');
		expect(result).toBe('0');
	});

	it('1 + 2 + 3 should be 6', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('+');
		calculatorService.processInput('2');
		calculatorService.processInput('+');
		calculatorService.processInput('3');
		var result = calculatorService.processInput('=');
		expect(result).toBe('6');
	});

	it('pressing "5", then "M+", then "C", then "MR" should dipslay 5', function () {
		calculatorService.start();
		calculatorService.processInput('5');
		calculatorService.processInput('M+');
		calculatorService.processInput('C');
		var result = calculatorService.processInput('MR');
		expect(result).toBe('5');
	});

	it('pressing "5", then "M+", then "C", then "5 * 2 =", then "M+", then "MR" should dipslay 15', function () {
		calculatorService.start();
		calculatorService.processInput('5');
		calculatorService.processInput('M+');
		calculatorService.processInput('C');
		calculatorService.processInput('5');
		calculatorService.processInput('*');
		calculatorService.processInput('2');
		calculatorService.processInput('=');
		calculatorService.processInput('M+');
		var result = calculatorService.processInput('MR');
		expect(result).toBe('15');
	});

	it('pressing "5", then "M+", then "MC", then "MR" should dipslay 0', function () {
		calculatorService.start();
		calculatorService.processInput('5');
		calculatorService.processInput('M+');
		calculatorService.processInput('MC');
		calculatorService.processInput('C');
		var result = calculatorService.processInput('MR');
		expect(result).toBe('0');
	});

	it('pressing "10", then "C", "M+", then "5", then "M-", then "C", then "MR" should dipslay 5', function () {
		calculatorService.start();
		calculatorService.processInput('1');
		calculatorService.processInput('0');		
		calculatorService.processInput('M+');
		calculatorService.processInput('C');
		calculatorService.processInput('5');
		calculatorService.processInput('M-');
		calculatorService.processInput('C');
		var result = calculatorService.processInput('MR');
		expect(result).toBe('5');
	});

	it('5+.9=*2 should be equal to 11.8', function () {
		calculatorService.start();
		calculatorService.processInput('5');
		calculatorService.processInput('+');
		calculatorService.processInput('.');
		calculatorService.processInput('9');
		calculatorService.processInput('=');
		calculatorService.processInput('*');
		calculatorService.processInput('2');
		var result = calculatorService.processInput('=');
		expect(result).toBe('11.8');
	});

	it('5+.9*2 should be equal to 11.8', function () {
		calculatorService.start();
		calculatorService.processInput('5');
		calculatorService.processInput('+');
		calculatorService.processInput('.');
		calculatorService.processInput('9');
		calculatorService.processInput('*');
		calculatorService.processInput('2');
		var result = calculatorService.processInput('=');
		expect(result).toBe('11.8');
	});
});