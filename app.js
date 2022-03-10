var express = require("express");
var app = express();
app.set("view engine", "ejs");
passport = require("passport");
bodyParser = require("body-parser");
LocalStrategy = require("passport-local");




const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://kumar:dk123@cluster0.hg9p0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	//MongoClient.connect(uri,function(err,db){
		//if(err) throw err;
	
		//var dbmy = db.db('mydbfirst');
		//var mydata = {name:'dinesh',password:'Dinesh@123'};
		//dbmy.collection('webusers').insertOne(mydata,function(err,res){
			//if(err) throw err;
			//console.log('Document inserted')
			//db.close();
		//});
	//});
	
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
	
	//Showing login form
	app.get("/login", function (req, res) {
		res.render("login");
	});
	//const findResult = await orders.find({
		//name: "Lemony Snicket",
		//date: {
		  //$gte: new Date(new Date().setHours(00, 00, 00)),
		  //$lt: new Date(new Date().setHours(23, 59, 59)),
		//},
	  //});
	app.post("/login", function (req, res) {
		var username = req.body.username
		var password = req.body.password
		MongoClient.connect(uri,function(err,db){

		      var dbmy = db.db('mydbfirst');
			  var mydata;
			
			
	        dbmy.collection('webusers')
				if(err) throw err;
				
				db.close();
		    const findResult = dbmy.find({
			   username:username,password:password

			
		
	         });
			});
          res.render('secret');



		//successRedirect: "/secret",
		//failureRedirect: "/login"
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
//mydata.register(new mydata({ username: username }),
				//password, function (err, user) {
			//if (err) {
				//console.log(err);
				//return res.render("register");
			//}
	
			
			//});
		//});