

var app =  angular.module('neo4jApp', [
	'neo4jApp.d3JSONServices',
	'ngRoute',
	'ngD3tree'
]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// $locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix = '#';



	$routeProvider.
		when("/", {redirectTo: '/sales'}).
		when("/sales", {templateUrl: "views/sales.html", controller: "salesController"}).
		when("/force", {templateUrl: "views/force.html", controller: "forceController"}).
		when("/forcestatic", {templateUrl: "views/forcestatic.html"}).
		when("/stickyforce", {templateUrl: "views/stickyforce.html", controller: "forceController"}).
		when("/stickyforcestatic", {templateUrl: "views/stickyforcestatic.html"}).
		when("/tree", {templateUrl: "views/tree.html", controller: "treeController"}).
		when("/treestatic", {templateUrl: "views/treestatic.html"}).
		when("/collapse", {templateUrl: "views/collapse.html", controller: "treeController"}).
		when("/collapsestatic", {templateUrl: "views/collapsestatic.html"}).
		when("/radialcluster", {templateUrl: "views/radialcluster.html", controller: "treeController"}).
		when("/radialclusterstatic", {templateUrl: "views/radialclusterstatic.html"});
}]);
