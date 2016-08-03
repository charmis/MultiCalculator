angular.module('app', ['ngRoute', 'mainModule', 'scientificCalculatorModule', 'standardCalculatorModule'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<standardcalculator>Standard</standardcalculator>'
        });
        $routeProvider.when('/standard', {
            template: '<standardcalculator>Standard</standardcalculator>'
        });
        $routeProvider.when('/scientific', {
            template: '<scientificcalculator></scientificcalculator>'
        });
    });