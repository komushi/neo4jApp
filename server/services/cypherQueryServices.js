var Q = require("q");
var request = require('request');
var neo4jManager = require('../utils/neo4jManager');
var cypherBuilder = require('../utils/cypherBuilder');


exports.executeCypher = function(queryOptions) {

    console.log("queryOptions:");
    console.log(JSON.stringify(queryOptions));

    var d = Q.defer();

    var cypherQuery = cypherBuilder[queryOptions.cypherQueryName](queryOptions);

    console.log("cypherQuery:");
    console.log(cypherQuery);

    // Set the headers
    var headers = {
        "Accept":       "application/json; charset=UTF-8",
        "Content-Type": "application/json"
    };

    var url = neo4jManager.getTransactionalEndpoint();

    // Configure the request
    var options = {
        url: url,
        method: "POST",
        headers: headers,
        json:     
        {
            "statements": 
            [
                {
                  "statement": cypherQuery,
                  "parameters": queryOptions.nodeProperties,
                  "resultDataContents":["graph"]                    
                }
            ]
        }
    };



    // Start the request
    request(options, function (error, response, body) {
        if (error) 
        {
            d.reject(error);
        }
        else
        {
            if (response.statusCode == 200) 
            {
                d.resolve(body);
            }
            else 
            {
                d.resolve(response.statusCode);
            }
        } 
    });

    return d.promise;
};
