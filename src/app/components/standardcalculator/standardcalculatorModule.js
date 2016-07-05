angular.module('standardCalculator', [])
    .component('standardcalculator', {
        templateUrl: '/app/components/standardcalculator/standardcalculatorview.html',
        controller: function () {
            var vm = this;

            vm.operand1 = 0;
            vm.operand2 = 0;
            vm.result = 0;

            var inputString = '';

            vm.add = function () {
                vm.result = vm.operand1 + vm.operand2;
            }

            vm.plusClick = function () {
                if (inputString.length > 0) {
                    if(vm.operand1 == 0)
                    {
                        vm.operand1 = parseInt(inputString);
                    }
                    else{
                        vm.operand2 = parseInt(inputString);
                    }
                }
            }

            vm.minusClick = function(){
                
            }

            vm.input = function (number) {
                inputString += number;
                console.log(number);
                console.log(inputString);
            }

        }
    });