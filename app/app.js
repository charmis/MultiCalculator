angular.module('app', ['ngMaterial', 'ngRoute', 'mainModule', 'scientificCalculator', 'standardCalculator', 'leftNavigation'])
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