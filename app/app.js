angular.module('app', ['ngRoute', 'mainModule'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<div>asdfasdf</div>'
        });
        $routeProvider.when('/standard', {
            template: '<div>Standard</div>'
        });
        $routeProvider.when('/scientific', {
            template: '<div>Scientific</div>'
        });
    });