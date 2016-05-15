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
	'contact': 'Contact',
	'follow': 'Follow 500 Miles'
};

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var email = require('emailjs/email');

var app = express();

var hostname = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var srcPath = __dirname + '/assets';
var destPath = __dirname + '/assets';

var emailServer  = email.server.connect({
   	user:    "", 
   	password:"", 
   	host:    "smtp.gmail.com", 
   	ssl:     true
});

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');
app.set('view options', { layout: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(sassMiddleware({
	src: srcPath,
	dest: destPath,
	debug: true,
	force: true,
	outputStyle: 'expanded'
}));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
	res.render('home', {
		title: 'Home',
	});
});

app.get('/:name', function (req, res, next) {
	console.log(req.params.name);
	res.render(req.params.name, {
		title: titles[req.params.name.toLowerCase()]
	}, function (err, result) {
		if (err) {
			next();
		} else {
			res.writeHeader(200, {"Content-Type": "text/html"});
			res.end(result);
		}
	});
});

app.get('/team/:name', function (req, res, next) {
	res.render('team/' + req.params.name, {
		title: 'About Us'
	}, function (err, result) {
		if (err) {
			next();
		} else {
			res.writeHeader(200, {"Content-Type": "text/html"});
			res.end(result);
		}
	});
});

app.post('/email', function (req, res, next) {
	emailServer.send({
		text:    req.body.comment, 
		from:    req.body.name + " <" + req.body.email + ">", 
		to:      "Jeffrey Xiao <jeffrey.xiao1998@gmail.com>",
		subject: req.body.subject
	}, function(err, message) { 
		console.log(err || message); 
		
		var result = "";
		if (err)
			result = err;
		
		if (message)
			result = "Email successfully sent!";
		
		res.render('result', {
			title: 'Contact',
			message: result
		}, function (err, result) {
			if (err) {
				next();
			} else {
				res.writeHeader(200, {"Content-Type": "text/html"});
				res.end(result);
			}
		});
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