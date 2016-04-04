String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) { 
		return a.toUpperCase(); 
	});
};

var titles = {
	'home': 'Home',
	'lessons': 'Lesson Plans',
	'resources': 'Other Parkison\'s Resources',
	'fundraising': 'School Fundraising Ideas',
	'contact': 'Contact'
};

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

var app = express();

var port = 3000;
var hostname = 'localhost';

var srcPath = __dirname + '/assets';
var destPath = __dirname + '/assets';

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(sassMiddleware({
	src: srcPath,
	dest: destPath,
	debug: true,
	force: true,
	outputStyle: 'expanded'
}));
// app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
	res.render('home', {
		title: 'Home',
	});
});

app.get('/:name', function (req, res, next) {
	res.render(req.params.name, {
		title: titles[req.params.name.toLowerCase()]
	}, function (err, result) {
		if (err) {
			next();
		} else {
			res.end(result);
		}
	});
});

app.get('/learn/:name', function (req, res, next) {
	var title = req.params.name.replace(/-/g, ' ').capitalize();
	res.render('learn/' + req.params.name, {
		title: title
	}, function (err, result) {
		if (err) {
			next();
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