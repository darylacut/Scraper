// exporting objects with all the models

// module.exports = {
//     Note: require("../../models/Note.js"),
//     User: require("../../models/User.js"),
//     Article: require("../../models/Article.js")
//   };


  $(document).ready(function () {

    /* Create variables to Dom needed DOM elements */
    var $scrapeButton = $("#scrapeButton");
    var $savedButton = $("#savedButton");
    var $contentDiv = $("#contentDiv");

    /* Create API object to make AJAX calls */
    var searchAPI = {

        getSaved: function () {
            return $.ajax({
                url: "/saved",
                type: "GET"
            });
        },

    };
