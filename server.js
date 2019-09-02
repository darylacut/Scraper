// require our dependencies
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// set-up port
var PORT = process.env.PORT || 8080;

// parsing the request as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// database info
var database = "scraperDB";
var scrapedData = ["myscrapedData"];

// create variable for mongojs
var db = mongojs(database, scrapedData);
db.on("error", function(error) {
  console.log("Returned error:", error);
});

// home route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

// getting data from the database
app.get("/alldata", function(req, res) {
  // getting all results from the myscrapedData;
  db.myscrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});




// Listen on port 
app.listen(PORT, function() {
  console.log("App listening on port:" + PORT);
});