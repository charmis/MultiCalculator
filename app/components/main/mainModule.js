angular.module("mainModule", [])
    .component("main", {
        templateUrl: "/app/components/main/main.html",
        controller: function () {
            console.info("inside controller");
        }
    });