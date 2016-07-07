angular.module('standardCalculator', ['calculatorEngine'])
    .component('standardcalculator', {
        templateUrl: '/app/components/standardcalculator/standardcalculatorview.html',
        controller: function (calculatorEngineService) {
            var vm = this;
            vm.displayText = '';
            calculatorEngineService.start();

            vm.buttonClick = function (input) {
                vm.displayText = calculatorEngineService.processInput(input);
            }
        }
    });