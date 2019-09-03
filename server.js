// require our dependencies
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Initialize Express
var app = express();

// set-up port
var PORT = process.env.PORT || 8080;

// parsing the request as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// database info
var scraperDB = "scraperDB";
var myscrapedData = ["myscrapedData"];

// connecting to mongo  
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperDB";
mongoose.connect(MONGODB_URI);


// create variable for mongojs
var db = mongojs(scraperDB, myscrapedData);
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

// scraping data from chosen website and putting it in mongoDB using axios get request and using cheerio to handle response data
app.get("/scrape", function(req, res) {
  axios.get("https://tinybuddha.com/blog-posts/").then(function(response) {

    var $ = cheerio.load(response.data);

    // getting from .archive class element and its children for the title and link
    $(".archive").each(function(i, element) {
      var title = $(element).children("a").attr("title");
      var link = $(element).children("a").attr("href");
      var imgLink = $(element).children("a").children("img").attr("src");


  // inserting the data into myscrapedData
  if (title && link && imgLink) {
    db.myscrapedData.insert({
          title: title,
          link: link,
          imgLink: imgLink
        },
        // function to log error if found else insert data into database
        function(err, inserted) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(inserted);
          }
        });
      }
    });
  });


  // "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 
app.listen(PORT, function() {
  console.log("App listening on port:" + PORT);
});