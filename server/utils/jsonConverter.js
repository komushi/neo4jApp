var idIndex = function(nodes,id) {
  for (var i=0;i<nodes.length;i++) {
    if (nodes[i].id == id) return i;}
  return null;
}

exports.getD3GraphJSON = function (graphJSON) {
  var nodes=[], links=[];
  graphJSON.results[0].data.forEach(function (row) {
     row.graph.nodes.forEach(function (n) {
       if (idIndex(nodes,n.id) == null)
         nodes.push({id:n.id,label:n.labels[0],name:n.properties.code});
     });
     links = links.concat( row.graph.relationships.map(function(r) {
       return {source:idIndex(nodes,r.startNode),target:idIndex(nodes,r.endNode),type:r.type};
     }));
  });
  viz = {nodes:nodes, links:links};
  return viz;
};

var getSourceNodeId = function (nodeid, relationships) {
  var sourceNodeIds = [];
  relationships.forEach(function (rel) {
    if (nodeid == rel.endNode)
    {
      // console.log("nodeid:" + nodeid);
      // console.log("rel.endNode:" + rel.endNode);
      // console.log("rel.startNode:" + rel.startNode);
      sourceNodeIds.push(rel.startNode);
    }
  });

  if (sourceNodeIds.length == 0)
  {
    return "null";
  }

  return sourceNodeIds[0];
};

var getFlatNestedJSON = function (graphJSON) {
  var nodes=[];
  graphJSON.results[0].data.forEach(function (row) {
     row.graph.nodes.forEach(function (n) {
       if (idIndex(nodes,n.id) == null){

          var sourceNodeId = getSourceNodeId(n.id, row.graph.relationships);
          nodes.push({id:n.id,label:n.labels[0],name:n.properties.code, parentId:sourceNodeId});
       }
     });

  });
  
  return nodes;
};

exports.getTreeJSON = function(graphJSON)
{
  var flatNestedJSON = getFlatNestedJSON(graphJSON);
  
  // create a name: node map
  var dataMap = flatNestedJSON.reduce(function(map, node) {
      map[node.id] = node;
      return map;
  }, {});

  // create the tree array
  var tree = [];
  flatNestedJSON.forEach(function(node) {
      // add to parent
      var parent = dataMap[node.parentId];
      if (parent) {
          // create child array if it doesn't exist
          (parent.children || (parent.children = []))
              // add node to child array
              .push(node);
      } else {
          // parent is null or missing
          tree.push(node);
      }
  });

  return tree[0];

};