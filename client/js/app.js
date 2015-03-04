

var app =  angular.module('neo4jApp', [
	'neo4jApp.d3JSONServices',
	'ngRoute',
	'ngD3tree'
]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// $locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix = '#';



	$routeProvider.
		when("/", {redirectTo: '/tree'}).
		when("/collapse", {templateUrl: "views/collapse.html", controller: "treeController"}).
		when("/tree", {templateUrl: "views/tree.html", controller: "treeController"}).
		when("/force", {templateUrl: "views/force.html", controller: "forceController"}).
		when("/sales", {templateUrl: "views/sales.html", controller: "salesController"});
}]);
