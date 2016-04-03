var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

var app = express();

var port = 3000;
var hostname = 'localhost';

var srcPath = __dirname;
var destPath = __dirname + '/public';

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(sassMiddleware({
	src: srcPath,
	dest: destPath,
	debug: true,
	force: true,
	outputStyle: 'expanded'
}));
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
	res.render('index', {
		title: 'Home'
	});
});

app.get('/blog/:name', function (req, res) {
	res.render('blog/' + req.params.name, {
		title: req.params.name
	}, function (err, result) {
		if (err) {
			console.log(err);
			res.render('404', {
				title: 'Page Not Found'
			});
		} else {
			res.end(result);
		}
	});
});

app.get('*', function (req, res) {
	res.render('404', {
		title: 'Page Not Found'
	});
});

app.listen(port, hostname, function () {
    console.log("Server is running at http://" + hostname + "/" + port);
});