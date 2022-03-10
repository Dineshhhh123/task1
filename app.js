var express = require("express");
const session = require('express-session');
const path = require('path');
var app = express();
app.set("view engine", "ejs");
passport = require("passport");
bodyParser = require("body-parser");
LocalStrategy = require("passport-local");




const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://kumar:dk123@cluster0.hg9p0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	
	
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());



	app.get("/", function (req, res) {
		res.render("home");
	});

	app.get("/secret", isLoggedIn, function (req, res) {
		res.render("secret");
	});

	app.get("/register", function (req, res) {
		res.render("register");
	});
	app.post("/register", function (req, res) {
		var username = req.body.username
		var password = req.body.password
		var name = req.body.name
		var mobile = req.body.mobile
		MongoClient.connect(uri,function(err,db){
			if(err) throw err;
		
			var dbmy = db.db('mydbfirst');
			var mydata = {username:username,password:password,name:name,mobile:mobile};
			
			dbmy.collection('webusers').insertOne(mydata,function(err,res){
				if(err) throw err;
				console.log('Document inserted')
				db.close();
			
				//passport.authenticate("local")(
					//req, res, function () {
					//res.redirect("secret");
					//});
			});
		});
		res.render('secret');
		
	});
	app.use(session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	}));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, 'static')));
	
	//Showing login form
	app.get("/login", function (req, res) {
		res.render("login");
	});
	app.post('/login', function(request, response) {
		
		let username = request.body.username;
		let password = request.body.password;
		
		if (username && password) {
			
			MongoClient.connect(uri,function(err,db){
				
				if (err) throw error;
				
				if (username && password == true) {
					// Authenticate the user
					request.session.loggedin = true;
					request.session.username = username;
					// Redirect to secret page
					response.redirect('secret');
				} else {
					response.send('Incorrect Username and/or Password!');
				}			
				response.end();
			});
		} else {
			response.send('Please enter Username and Password!');
			response.end();
		}
	});
	

	app.get("/logout", function (req, res) {
		req.logout();
		res.redirect("/");
	});
    function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) return next();
		res.redirect("/login");
	}
	

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
