var cfenv = require("cfenv");
var uri = "http://localhost:7474"

var getNeo4jUri = function() {
  if (!uri)
  {
    var appEnv = cfenv.getAppEnv();
    var services = appEnv.getServices();
    var neo4jService = process.env["SERVICE_NAME"];

    var myservice = appEnv.getService(neo4jService);
    var credentials = myservice.credentials;

    uri = credentials.uri;
  }

  return uri;
};


exports.getTransactionalEndpoint = function() {
  var endpoint = getNeo4jUri() + "/db/data/transaction/commit";
  return endpoint;

};
