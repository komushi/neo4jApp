var app = angular.module('neo4jApp');

app.controller('treeController', ['$scope','$interval', 'd3JSONServices', function($scope, $interval, d3JSONServices){

    var initialize = function () {
      console.log("treeController initialize");

      var jsonParam = {};
      var nodeProperties = {};

      jsonParam.cypherQueryName = "startFrom";
      jsonParam.nodeLabel = "Operation";
      jsonParam.relationshipType = "POST_OPR";
      nodeProperties.code = "0011";
      nodeProperties.level = 1;
      jsonParam.nodeProperties = nodeProperties;
      

      d3JSONServices.getTree(jsonParam).success(function(response) {

          angular.extend($scope, {
            d3json: response
          });
      });

    };

    initialize();
}]);

