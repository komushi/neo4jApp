var express = require("express");
// var prefsController = require("../controllers/prefsController");
// var areasController = require("../controllers/areasController");
// var catsController = require("../controllers/catsController");
// var countByAreaController = require("../controllers/countByAreaController");
// var countByCatController = require("../controllers/countByCatController");
// var countByAreaCatController = require("../controllers/countByAreaCatController");
// var countByCatAreaController = require("../controllers/countByCatAreaController");
var graphJSONController = require("../controllers/graphJSONController");
var treeJSONController = require("../controllers/treeJSONController");



//configure routes
var router = express.Router();

/**************************/
/* REST API hello */
router.route('/api')
  .get(function (req, res) {
   res.send('REST API is running.');
   console.log("REST API is running.");
});
/* REST API hello */
/**************************/

/**************************/
/* REST API /api/getGraph */
router.route('/api/queryGraph/')
  .post(function (req, res) {
    graphJSONController.queryGraph(req, res);
});
/* REST API /api/getGraph */
/**************************/

/**************************/
/* REST API /api/getTree */
router.route('/api/queryTree/')
  .post(function (req, res) {
    treeJSONController.queryTree(req, res);
});
/* REST API /api/getTree */
/**************************/

module.exports=router;