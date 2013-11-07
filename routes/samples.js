var fs = require('fs');

exports.xmlhr = function(req, res){
  fs.readFile('app/views/samples/data.txt', function (error, data) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send(data);
  });
};