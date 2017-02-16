var express = require('express');
var app = express();
var path = require("path");
var environment = app.get('env');

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

console.log(environment);
var port = 3000
if (environment === "production") {
  port = 8080;
}
app.listen(port);
console.log('starting web server on port ' + port);

