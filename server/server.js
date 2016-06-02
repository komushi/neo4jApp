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



// var graph =
//           {
//             "nodes": [
//               {
//                 "id": "2",
//                 "labels": ["123"],
//                 "properties": {
//                   "species": "Timelord",
//                   "acs": "dsada"
//                 }
//               },
//               {
//                 "id": "19",
//                 "labels": ["123"],
//                 "properties": {
//                   "character": "Susan Foreman",
//                   "a111cs": "dsadasda"
//                 }
//               },
//               {
//                 "id": "5",
//                 "labels": ["123"],
//                 "properties": {
//                   "planet": "Gallifrey"
//                 }
//               }
//             ]
//           };

// var idIndex = function(nodes,id) {
//   for (var i=0;i<nodes.length;i++) {
//     if (nodes[i].id == id) return i;}
//   return null;
// };

// var forEachElement = function(obj, iterator, context) {
//   var key, length;
//   if (obj) {

//       for (key in obj) {
//         if (obj.hasOwnProperty(key)) {
//           iterator.call(context, obj[key], key, obj);
//         }
//       }
    
//   }
//   return obj;
// };






//   var nodes=[];

//     graph.nodes.forEach(function (n) {
//         if (idIndex(nodes,n.id) == null)
//         {


//             var conditions = [];

//             forEachElement(n.properties, 
//                 function(value, key) {
//                   this.push(',"' + key + '":' + '"' + value + '"');
//                 }, 
//                 conditions);

//             var text = '{"id":"' + n.id + '","label":"' + n.labels[0] + '"';

//             conditions.forEach(function(entry) {
//                 text = text.concat(entry);
//             });

//             text += '}';

//             // console.log(text);  
//             var json = JSON.parse(text);

//             nodes.push(json);

//             // nodes.push({id:n.id,label:n.labels[0],name:n.properties.code});
//         }
//     });


// console.log(JSON.stringify(nodes));

var d = {"label":"123", "def":"123"};
console.log(JSON.stringify(d));


/********/


var server = app.listen((process.env.PORT || 9000), function() {
  console.log('Express server listening on port ' + server.address().port);
});

