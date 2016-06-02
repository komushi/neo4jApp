var forEachElement = function(obj, iterator, context) {
  var key, length;
  if (obj) {

      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    
  }
  return obj;
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
exports.startFrom = function(queryOptions) {
  
  var nodeLabel = queryOptions.nodeLabel;
  var nodeProperties = queryOptions.nodeProperties;
  var relationshipTypes = queryOptions.relationshipTypes;
  var level = (!queryOptions.level) ? "*1.." : "*1.." + queryOptions.level;

  var query = ""
  var startNode = "StartNode";
  var startNodeWithB;
  var firstNode = "FirstNode";
  var firstNodeWithB;
  var endNode = "EndNode";
  var endNodeWithB;
  var anyNode = "";
  var multiRel = "";
  var rel = "";

  if (nodeLabel) 
  {
    startNodeWithB = "(".concat(startNode,":",nodeLabel,")");
    firstNodeWithB = "(".concat(firstNode,":",nodeLabel,")");
    anyNode = "(".concat(":",nodeLabel,")");
  }
  else
  {
    startNodeWithB = "(".concat(startNode,")");
    firstNodeWithB = "(".concat(firstNode,")");
    anyNode = "()";
  }

  var tmprel = "";
  if (relationshipTypes)
  {
    relationshipTypes.forEach(function(relationshipType, index){
      if (index == 0)
      {
        tmprel = tmprel.concat(":",relationshipType.type);
      }
      else
      {
        tmprel = tmprel.concat("|:",relationshipType.type);
      }
    });    
  }

  multiRel = "[".concat(tmprel, level, "]");

  if (tmprel) 
  {    
    rel = "[".concat(tmprel,"]");
  }

  query = query.concat("MATCH p=", firstNodeWithB, "-", multiRel, "->", startNodeWithB);
  query = query.concat(" WHERE NOT (", anyNode, "-", rel, "->", firstNodeWithB, ")");


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

MATCH p= (opr1st:Operation)-[r:POST_OPR*1..]->(opr:Operation)
WHERE opr.code = "0040"
AND NOT (opr1st<-[:POST_OPR]-(:Operation)) return p;

nodeLabel - Such as opr:Operation, nodeLabel = "Operation"
nodeProperties -  nodeProperties = {"code":"0020", "level":"1"}
relationshipType - Such as rel:POST_OPR, relationshipType = "POST_OPR"
*/
exports.endWith = function(queryOptions) {
  
  var nodeLabel = queryOptions.nodeLabel;
  var nodeProperties = queryOptions.nodeProperties;
  var relationshipTypes = queryOptions.relationshipTypes;
  var level = (!queryOptions.level) ? "*1.." : "*1.." + queryOptions.level;

  var query = ""
  var startNode = "StartNode";
  var startNodeWithB;
  var firstNode = "FirstNode";
  var firstNodeWithB;
  var endNode = "EndNode";
  var endNodeWithB;
  var anyNode = "";
  var multiRel = "";
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

  var tmprel = "";
  if (relationshipTypes)
  {
    relationshipTypes.forEach(function(relationshipType, index){
      if (index == 0)
      {
        tmprel = tmprel.concat(":",relationshipType.type);
      }
      else
      {
        tmprel = tmprel.concat("|:",relationshipType.type);
      }
    });    
  }

  multiRel = "[".concat(tmprel, level, "]");

  if (tmprel) 
  {    
    rel = "[".concat(tmprel,"]");
  }


  query = query.concat(" MATCH p=", startNodeWithB, "-", multiRel, "->", endNodeWithB);
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

MATCH p= (opr1st:Operation)-[r:POST_OPR*1..]->(opr:Operation)
WHERE opr.code = "0040"
AND NOT (opr1st<-[:POST_OPR]-(:Operation)) return p;

nodeLabel - Such as opr:Operation, nodeLabel = "Operation"
nodeProperties -  nodeProperties = {"code":"0020", "level":"1"}
relationshipType - Such as rel:POST_OPR, relationshipType = "POST_OPR"
*/
exports.contains = function(queryOptions) {
  
  var nodeLabel = queryOptions.nodeLabel;
  var nodeProperties = queryOptions.nodeProperties;
  var relationshipTypes = queryOptions.relationshipTypes;
  var level = (!queryOptions.level) ? "*1.." : "*1.." + queryOptions.level;

  console.log("level:" + level);

  var query = ""
  var startNode = "StartNode";
  var startNodeWithB;
  var firstNode = "FirstNode";
  var firstNodeWithB;
  var endNode = "EndNode";
  var endNodeWithB;
  var anyNode = "";
  var multiRel = "";
  var rel = "";

  if (nodeLabel) 
  {
    startNodeWithB = "(".concat(startNode,":",nodeLabel,")");
    firstNodeWithB = "(".concat(firstNode,":",nodeLabel,")");
    endNodeWithB = "(".concat(endNode,":",nodeLabel,")");
    anyNode = "(".concat(":",nodeLabel,")");
  }
  else
  {
    startNodeWithB = "(".concat(startNode,")");
    firstNodeWithB = "(".concat(firstNode,")");
    endNodeWithB = "(".concat(endNode,")");
    anyNode = "()";
  }

  var tmprel = "";
  if (relationshipTypes)
  {
    relationshipTypes.forEach(function(relationshipType, index){
      if (index == 0)
      {
        tmprel = tmprel.concat(":",relationshipType.type);
      }
      else
      {
        tmprel = tmprel.concat("|:",relationshipType.type);
      }
    });    
  }

  multiRel = "[".concat(tmprel, level, "]");

  if (tmprel) 
  {    
    rel = "[".concat(tmprel,"]");
  }

  query = query.concat("MATCH p=", firstNodeWithB, "-", multiRel, "->", startNodeWithB);
  query = query.concat(" WHERE NOT (", anyNode, "-", rel, "->", firstNodeWithB, ")");


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

  query = query.concat(" RETURN p");

  query = query.concat(" UNION");

  query = query.concat(" MATCH p=", startNodeWithB, "-", multiRel, "->", endNodeWithB);
  query = query.concat(" WHERE NOT (", endNodeWithB, "-", rel, "->", anyNode, ")");


  conditions.forEach(function(entry) {
      query = query.concat(entry);
  });

  query = query.concat(" RETURN p;");

  return query;
};
