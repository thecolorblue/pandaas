require('babel/register');

var express = require('express');
var pandoc = require('./pandoc/index.js');
var bodyParser = require('body-parser');
var upload = require('multer')({ dest: 'tmp/' });
var mime = require('mime-types');

var app = express();

app.use('/app', express.static(__dirname + '/app'));

app.use('/files', function(req, res, next) {
  var file = req.url;
  res.setHeader('Content-disposition', 'attachment; filename=' + file);
  res.setHeader('Content-type', mime.lookup(file));

  next();
}, express.static(__dirname + '/files'));

app.post('/api/import', upload.single('import'), pandoc.import, pandoc.mdResponse);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/api/export', pandoc.export, pandoc.urlResponse);

require('./start_server.js')(app);
