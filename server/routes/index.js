/*
 * GET home page.
 */
var fs = require("fs");

exports.index = function(req, res) {
  fs.readFile('public/index.html', 'utf8', function(error, data) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send(data);
  });
};
