angular.module('app', ['ngRoute', 'mainModule'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<main></main>'
        });
    });