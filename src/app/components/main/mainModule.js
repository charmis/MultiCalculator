angular.module("mainModule", ['headerModule', 'footerModule', 'leftNavigationModule'])
    .component("main", {
        templateUrl: "/app/components/main/main.html",
        controller: function () {
        }
    });