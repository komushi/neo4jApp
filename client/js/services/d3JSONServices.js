var d3JSONServices = function($injectHttp) {

    $http = $injectHttp;

    var graphJSONAPI = {};

    graphJSONAPI.getGraph = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: "/api/queryGraph/",
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };

    graphJSONAPI.getTree = function(jsonParam) {
      return $http({
        method: 'POST', 
        url: "/api/queryTree/",
        data: jsonParam,
        headers: {'Content-Type': 'application/json'}
      });
    };
    // neo4jAPI.getGnaviCats = function() {
    //   return $http({
    //     method: 'GET', 
    //     url: '/api/getGnaviCats'
    //   });
    // };

    // neo4jAPI.getCountByAreaCat = function(jsonParam) {
    //   return $http({
    //     method: 'POST', 
    //     url: '/api/getCountByAreaCat',
    //     data: jsonParam,
    //     headers: {'Content-Type': 'application/json'}
    //   });
    // };

    // neo4jAPI.getCountByCatArea = function(jsonParam) {
    //   return $http({
    //     method: 'POST', 
    //     url: '/api/getCountByCatArea',
    //     data: jsonParam,
    //     headers: {'Content-Type': 'application/json'}
    //   });
    // };

    return graphJSONAPI;
};


var d3JSONAPIModule = angular.module('neo4jApp.d3JSONServices', []);
d3JSONAPIModule.factory('d3JSONServices', ['$http', d3JSONServices]);

