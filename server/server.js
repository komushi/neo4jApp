/**************************/
/* config */
var application_root = __dirname;
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.disable('etag'); 
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
   extended: true 
}));
app.use(express.static(path.join(application_root, "../client")));
app.use('/', routes);

/* config */
/**************************/

/********/



var graph =
          {
            "nodes": [
              {
                "id": "2",
                "labels": ["123"],
                "properties": {
                  "species": "Timelord",
                  "acs": "dsada"
                }
              },
              {
                "id": "19",
                "labels": ["123"],
                "properties": {
                  "character": "Susan Foreman",
                  "a111cs": "dsadasda"
                }
              },
              {
                "id": "5",
                "labels": ["123"],
                "properties": {
                  "planet": "Gallifrey"
                }
              }
            ]
          };

var idIndex = function(nodes,id) {
  for (var i=0;i<nodes.length;i++) {
    if (nodes[i].id == id) return i;}
  return null;
};

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






  var nodes=[];

    graph.nodes.forEach(function (n) {
        if (idIndex(nodes,n.id) == null)
        {


            var conditions = [];

            forEachElement(n.properties, 
                function(value, key) {
                  this.push(',"' + key + '":' + '"' + value + '"');
                }, 
                conditions);

            var text = '{"id":"' + n.id + '","label":"' + n.labels[0] + '"';

            conditions.forEach(function(entry) {
                text = text.concat(entry);
            });

            text += '}';

            // console.log(text);  
            var json = JSON.parse(text);

            nodes.push(json);

            // nodes.push({id:n.id,label:n.labels[0],name:n.properties.code});
        }
    });


console.log(JSON.stringify(nodes));


//   var query = ""
//   var startNode = "StartNode";
//   var startNodeWithB;
//   var firstNode = "FirstNode";
//   var firstNodeWithB;
//   var endNode = "EndNode";
//   var endNodeWithB;
//   var anyNode = "";
//   var multiRel = "";
//   var rel = "";
//     var nodeLabel = "";
//     // var relationshipType = "POST_OPR";
//     var relationshipTypes = [{"type":"POST_OPR"},{"type":"PRE_OPR"}];
//     var nodeProperties = {"code": "0021", "level": 2};


//   if (nodeLabel) 
//   {
//     startNodeWithB = "(".concat(startNode,":",nodeLabel,")");
//     firstNodeWithB = "(".concat(firstNode,":",nodeLabel,")");
//     endNodeWithB = "(".concat(endNode,":",nodeLabel,")");
//     anyNode = "(".concat(":",nodeLabel,")");
//   }
//   else
//   {
//     startNodeWithB = "(".concat(startNode,")");
//     firstNodeWithB = "(".concat(firstNode,")");
//     endNodeWithB = "(".concat(endNode,")");
//     anyNode = "()";
//   }

//   var tmprel = "";
//   relationshipTypes.forEach(function(relationshipType, index){
//     if (index == 0)
//     {
//       tmprel = tmprel.concat(":",relationshipType.type);
//     }
//     else
//     {
//       tmprel = tmprel.concat("|:",relationshipType.type);
//     }
//   });

//   if (tmprel) 
//   {
//     multiRel = "[".concat(tmprel, "*1..]");
//     rel = "[".concat(tmprel,"]");
//   }
//   else
//   {
//     multiRel = "[".concat(tmprel,"*1..]");
//   }

//   query = query.concat("MATCH p=", firstNodeWithB, "-", multiRel, "->", startNodeWithB);
//   query = query.concat(" WHERE NOT (", anyNode, "-", rel, "->", firstNodeWithB, ")");


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

//   query = query.concat(" RETURN p");

//   query = query.concat(" UNION");

//   query = query.concat(" MATCH p=", startNodeWithB, "-", multiRel, "->", endNodeWithB);
//   query = query.concat(" WHERE NOT (", endNodeWithB, "-", rel, "->", anyNode, ")");


//   conditions.forEach(function(entry) {
//       query = query.concat(entry);
//   });

//   query = query.concat(" RETURN p;");

//   console.log(query);

// var params = {"oprcode": "0031"};
// var query = "MATCH p= (opr:Operation)-[r:POST_OPR*1..]->(oprlast:Operation) " +
//             "WHERE opr.code = {oprcode} AND not (oprlast-[:POST_OPR]->(:Operation)) return p;";

// var res = 
// {"results":[{"columns":["p"],"data":[{"graph":{"nodes":[{"id":"18","labels":["Operation"],"properties":{"code":"0032","level":3}},{"id":"20","labels":["Operation"],"properties":{"code":"0041","level":4}},{"id":"22","labels":["Operation"],"properties":{"code":"0051","level":5}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"18","type":"POST_OPR","startNode":"20","endNode":"22","properties":{}},{"id":"12","type":"POST_OPR","startNode":"15","endNode":"18","properties":{}},{"id":"15","type":"POST_OPR","startNode":"18","endNode":"20","properties":{}}]}},{"graph":{"nodes":[{"id":"18","labels":["Operation"],"properties":{"code":"0032","level":3}},{"id":"20","labels":["Operation"],"properties":{"code":"0041","level":4}},{"id":"23","labels":["Operation"],"properties":{"code":"0052","level":5}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"19","type":"POST_OPR","startNode":"20","endNode":"23","properties":{}},{"id":"12","type":"POST_OPR","startNode":"15","endNode":"18","properties":{}},{"id":"15","type":"POST_OPR","startNode":"18","endNode":"20","properties":{}}]}},{"graph":{"nodes":[{"id":"17","labels":["Operation"],"properties":{"code":"0031","level":3}},{"id":"19","labels":["Operation"],"properties":{"code":"0040","level":4}},{"id":"21","labels":["Operation"],"properties":{"code":"0050","level":3}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"16","type":"POST_OPR","startNode":"19","endNode":"21","properties":{}},{"id":"11","type":"POST_OPR","startNode":"15","endNode":"17","properties":{}},{"id":"14","type":"POST_OPR","startNode":"17","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"17","labels":["Operation"],"properties":{"code":"0031","level":3}},{"id":"19","labels":["Operation"],"properties":{"code":"0040","level":4}},{"id":"22","labels":["Operation"],"properties":{"code":"0051","level":5}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"17","type":"POST_OPR","startNode":"19","endNode":"22","properties":{}},{"id":"11","type":"POST_OPR","startNode":"15","endNode":"17","properties":{}},{"id":"14","type":"POST_OPR","startNode":"17","endNode":"19","properties":{}}]}}]}],"errors":[]};





/********/


var server = app.listen((process.env.PORT || 9000), function() {
  console.log('Express server listening on port ' + server.address().port);
});

