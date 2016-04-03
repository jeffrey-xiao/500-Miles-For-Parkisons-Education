var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

var app = express();

var port = 3000;
var hostname = 'localhost';

var srcPath = __dirname;
var destPath = path.join(__dirname, 'public');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(sassMiddleware({
	src: srcPath,
	dest: destPath,
	debug: true,
	outputStyle: 'expanded'
}));

app.get('/', function (req, res) {
	res.render('index', {
		title: 'Home'
	});
});

app.listen(port, hostname, function () {
    console.log("Server is running at http://" + hostname + "/" + port);
});