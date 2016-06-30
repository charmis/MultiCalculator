angular.module("mainModule", ['headerModule', 'footerModule'])
    .component("main", {
        templateUrl: "/app/components/main/main.html",
        controller: function () {
            console.info("inside controller");
        }
    });