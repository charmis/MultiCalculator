angular.module("headerModule", [])
  .component("header", {
    templateUrl: "/app/components/header/headerView.html",
    controller: function () {
      console.log("insider HeaderController");
    }
  });