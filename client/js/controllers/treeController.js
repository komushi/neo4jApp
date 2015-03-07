var app = angular.module('neo4jApp');

app.controller('treeController', ['$scope','$interval', 'd3JSONServices', function($scope, $interval, d3JSONServices){

    var initialize = function () {
      console.log("treeController initialize");

      var jsonParam = {};
      var nodeProperties = {};


      jsonParam.cypherQueryName = "endWith";
      // jsonParam.nodeLabel = "Operation";
      // jsonParam.level = "2";
      // jsonParam.relationshipTypes = [{"type":"COMES_FROM"},{"type":"IS_A"},{"type":"LOVES"},{"type":"ENEMY_OF"}];
      nodeProperties.code = "0010";
      // nodeProperties.planet = "Earth";
      // nodeProperties.level = 5;
      jsonParam.nodeProperties = nodeProperties;
      

      d3JSONServices.getTree(jsonParam).success(function(response) {

          angular.extend($scope, {
            d3json: response
          });
      });

    };

    initialize();
}]);

