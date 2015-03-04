function forEachElement(obj, iterator, context) {
  var key, length;
  if (obj) {

      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    
  }
  return obj;
} 

/*

MATCH p= (nodestart)-[r*1..]->(nodeend) 
WHERE nodestart.code = "0010"
AND not (nodeend-->()) return p;

MATCH p= (opr:Operation)-[r:POST_OPR*1..]->(oprlast:Operation) 
WHERE opr.code = {oprcode} AND not (oprlast-[:POST_OPR]->(:Operation)) return p;


nodeLabel - Such as opr:Operation, nodeLabel = "Operation"
nodeProperties -  nodeProperties = {"code":"0020", "level":"1"}
relationshipType - Such as rel:POST_OPR, relationshipType = "POST_OPR"
*/
exports.startFrom = function(nodeLabel, nodeProperties, relationshipType) {
  
  var query = ""
  var startNode = "StartNode";
  var startNodeWithB;
  var endNode = "EndNode";
  var endNodeWithB;
  var anyNode = "";
  var multiRel = "rel";
  var rel = "";

  if (nodeLabel) 
  {
    startNodeWithB = "(".concat(startNode,":",nodeLabel,")");
    endNodeWithB = "(".concat(endNode,":",nodeLabel,")");
    anyNode = "(".concat(":",nodeLabel,")");
  }
  else
  {
    startNodeWithB = "(".concat(startNode,")");
    endNodeWithB = "(".concat(endNode,")");
    anyNode = "()";
  }

  if (relationshipType) 
  {
    multiRel = "[".concat(multiRel,":",relationshipType,"*1..]");
    rel = "[".concat(":",relationshipType,"]");
  }
  else
  {
    multiRel = "[".concat(multiRel,"*1..]");
  }

  query = query.concat("MATCH p=", startNodeWithB, "-", multiRel, "->", endNodeWithB);
  query = query.concat(" WHERE NOT (", endNodeWithB, "-", rel, "->", anyNode, ")");


  var conditions = [];
  var parameters = {};

  if (nodeProperties) 
  {

    forEachElement(nodeProperties, 
        function(value, key) {
          this.push(" AND " + startNode + "." + key + ' = {' + key + "}");
        }, 
        conditions);

    forEachElement(nodeProperties, 
        function(value, key) {
          parameters[key] = value;
        }, 
        parameters);

  }

  conditions.forEach(function(entry) {
      query = query.concat(entry);
  });

  query = query.concat(" RETURN p;");

  return query;
};

/*

MATCH p= (nodestart)-[r*1..]->(nodeend) 
WHERE nodestart.code = "0010"
AND not (nodeend-->()) return p;

MATCH p= (opr:Operation)-[r:POST_OPR*1..]->(oprlast:Operation) 
WHERE opr.code = {oprcode} AND not (oprlast-[:POST_OPR]->(:Operation)) return p;


nodeLabel - Such as opr:Operation, nodeLabel = "Operation"
nodeProperties -  nodeProperties = {"code":"0020", "level":"1"}
relationshipType - Such as rel:POST_OPR, relationshipType = "POST_OPR"
*/
// exports.endWith = function(nodeLabel, nodeProperties, relationshipType) {
  
//   var query = ""
//   var startNode = "StartNode";
//   var startNodeWithB;
//   var endNode = "EndNode";
//   var endNodeWithB;
//   var anyNode = "";
//   var multiRel = "rel";
//   var rel = "";

//   if (nodeLabel) 
//   {
//     startNodeWithB = "(".concat(startNode,":",nodeLabel,")");
//     endNodeWithB = "(".concat(endNode,":",nodeLabel,")");
//     anyNode = "(".concat(":",nodeLabel,")");
//   }
//   else
//   {
//     startNodeWithB = "(".concat(startNode,")");
//     endNodeWithB = "(".concat(endNode,")");
//     anyNode = "()";
//   }

//   if (relationshipType) 
//   {
//     multiRel = "[".concat(multiRel,":",relationshipType,"*1..]");
//     rel = "[".concat(":",relationshipType,"]");
//   }
//   else
//   {
//     multiRel = "[".concat(multiRel,"*1..]");
//   }

//   query = query.concat("MATCH p=", startNodeWithB, "-", multiRel, "->", endNodeWithB);
//   query = query.concat(" WHERE NOT (", endNodeWithB, "-", rel, "->", anyNode, ")");


//   var conditions = [];
//   var parameters = {};

//   if (nodeProperties) 
//   {

//     forEachElement(nodeProperties, 
//         function(value, key) {
//           this.push(" AND " + startNode + "." + key + ' = {' + key + "}");
//         }, 
//         conditions);

//     forEachElement(nodeProperties, 
//         function(value, key) {
//           parameters[key] = value;
//         }, 
//         parameters);

//   }

//   conditions.forEach(function(entry) {
//       query = query.concat(entry);
//   });

//   query = query.concat(" RETURN p;");

//   return query;
// };
