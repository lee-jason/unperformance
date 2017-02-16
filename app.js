var express = require('express');
var app = express();
var path = require("path");
var environment = app.get('env');

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

console.log(environment);
if (environment !== "production") {
  app.listen(3000);
} else {
  app.listen(8080);
}
console.log('starting web server on port 3000');

