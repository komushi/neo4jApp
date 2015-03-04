var Q = require('q');
var services = require('../services/cypherQueryServices');
var jsonConverter = require('../utils/jsonConverter');


exports.queryGraph = function(req, res) {
        

    services.executeCypher(req.body)
        .then(function(result){
            var resBody = jsonConverter.getD3GraphJSON(result);
            console.log('resBody:');
            console.log(JSON.stringify(resBody));
            res.set('Content-Type', 'application/json');
            res.status(200);

            res.send(resBody);
        })
        .catch(function(error){
            console.log("controller error:");
            console.log(error.stack);
            res.set('Content-Type', 'application/json');
            res.status(500);
            res.send(error.message);
        })
        .done();
};
