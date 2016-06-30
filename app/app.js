angular.module('app', ['ngRoute', 'mainModule', 'scientificCalculator', 'standardCalculator'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<div>asdfasdf</div>'
        });
        $routeProvider.when('/standard', {
            template: '<standardcalculator>Standard</standardcalculator>'
        });
        $routeProvider.when('/scientific', {
            template: '<scientificcalculator></scientificcalculator>'
        });
    });