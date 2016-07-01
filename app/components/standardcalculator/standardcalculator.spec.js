describe('calculator', function () {

  beforeEach(module('standardcalculatorModule'));
	var element;
  var scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<standardcalculator></standardcalculator>');
    element = $compile(element)(scope);
    scope.outside = '1.5';
    scope.$apply();
  }));

	var controller;
	beforeEach(function () {
		controller = element.controller('myComponent');
	});

	it('should expose my title', function () {
		expect(controller.myTitle).toBeDefined();
		expect(controller.myTitle).toBe('Unit Testing AngularJS');
	});

  describe('sum', function () {
		it('1 + 1 should equal 2', function () {
			var $scope = {};
			var controller = $controller('CalculatorController', { $scope: $scope });
			$scope.x = 1;
			$scope.y = 2;
			$scope.sum();
			expect($scope.z).toBe(3);
		});
	});

});