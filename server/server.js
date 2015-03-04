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
    // var query = ""
    // var startNode = "StartNode";
    // var endNode = "EndNode";
    // var anyNode = "";
    // var multiRel = "rel";
    // var rel = "";
    // var nodeLabel = "Operation";
    // var relationshipType = "POST_OPR";
    // var nodeProperties = {"code": "0021", "level": 2};

  

// var params = {"oprcode": "0031"};
// var query = "MATCH p= (opr:Operation)-[r:POST_OPR*1..]->(oprlast:Operation) " +
//             "WHERE opr.code = {oprcode} AND not (oprlast-[:POST_OPR]->(:Operation)) return p;";

// var res = 
// {"results":[{"columns":["p"],"data":[{"graph":{"nodes":[{"id":"18","labels":["Operation"],"properties":{"code":"0032","level":3}},{"id":"20","labels":["Operation"],"properties":{"code":"0041","level":4}},{"id":"22","labels":["Operation"],"properties":{"code":"0051","level":5}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"18","type":"POST_OPR","startNode":"20","endNode":"22","properties":{}},{"id":"12","type":"POST_OPR","startNode":"15","endNode":"18","properties":{}},{"id":"15","type":"POST_OPR","startNode":"18","endNode":"20","properties":{}}]}},{"graph":{"nodes":[{"id":"18","labels":["Operation"],"properties":{"code":"0032","level":3}},{"id":"20","labels":["Operation"],"properties":{"code":"0041","level":4}},{"id":"23","labels":["Operation"],"properties":{"code":"0052","level":5}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"19","type":"POST_OPR","startNode":"20","endNode":"23","properties":{}},{"id":"12","type":"POST_OPR","startNode":"15","endNode":"18","properties":{}},{"id":"15","type":"POST_OPR","startNode":"18","endNode":"20","properties":{}}]}},{"graph":{"nodes":[{"id":"17","labels":["Operation"],"properties":{"code":"0031","level":3}},{"id":"19","labels":["Operation"],"properties":{"code":"0040","level":4}},{"id":"21","labels":["Operation"],"properties":{"code":"0050","level":3}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"16","type":"POST_OPR","startNode":"19","endNode":"21","properties":{}},{"id":"11","type":"POST_OPR","startNode":"15","endNode":"17","properties":{}},{"id":"14","type":"POST_OPR","startNode":"17","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"17","labels":["Operation"],"properties":{"code":"0031","level":3}},{"id":"19","labels":["Operation"],"properties":{"code":"0040","level":4}},{"id":"22","labels":["Operation"],"properties":{"code":"0051","level":5}},{"id":"15","labels":["Operation"],"properties":{"code":"0021","level":2}}],"relationships":[{"id":"17","type":"POST_OPR","startNode":"19","endNode":"22","properties":{}},{"id":"11","type":"POST_OPR","startNode":"15","endNode":"17","properties":{}},{"id":"14","type":"POST_OPR","startNode":"17","endNode":"19","properties":{}}]}}]}],"errors":[]};





/********/


var server = app.listen((process.env.PORT || 9000), function() {
  console.log('Express server listening on port ' + server.address().port);
});

