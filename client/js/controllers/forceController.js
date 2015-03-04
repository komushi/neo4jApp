
var app = angular.module('neo4jApp');

app.controller('forceController', ['$scope','$interval', 'd3JSONServices', function($scope, $interval, d3JSONServices){

    var initialize = function () {
      console.log("forceController initialize");

      var jsonParam = {};
      var nodeProperties = {};

      jsonParam.cypherQueryName = "startFrom";
      // jsonParam.nodeLabel = "Operation";
      // jsonParam.relationshipType = "POST_OPR";
      // nodeProperties.code = "0010";
      // nodeProperties.level = 2;
      jsonParam.nodeProperties = nodeProperties;
      

      d3JSONServices.getGraph(jsonParam).success(function(response) {

          angular.extend($scope, {
            d3json: response
          });
      });

    };

    initialize();
}]);

