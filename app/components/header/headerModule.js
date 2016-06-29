angular.module("headerModule")
.component("header", headerComponent);

var headerComponent = {
  templateUrl: 'headerView.html',
  controller: HeaderController
};

function HeaderController()
{

}