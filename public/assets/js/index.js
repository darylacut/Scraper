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


    /* Functions called by Event Listeners */
    var handleScrapeSubmit = function (event) {
        event.preventDefault();

        var searchTerm = $scrapeTerm.val().trim();

        searchAPI.scrapeTerm(searchTerm).then(function (resp) {

            var data = prepareResponseForTable(resp);
            makeTable($tableDiv, data);
        });

        // Clear out scrape field
        $scrapeTerm.val("");
    };


    var handleSearchSubmit = function (event) {

        var searchTerm = $searchTerm.val().trim();

        searchAPI.searchTerm(searchTerm).then(function (resp) {

            var data = prepareResponseForTable(resp);
            makeTable($tableDiv, data);
        });

        // Clear out search field
        $searchTerm.val("");
    };

    var handleGetAll = function (event) {

        searchAPI.getAll()
        .then(function(resp) {
            var data = prepareResponseForTable(resp);
            makeTable($tableDiv, data);

        })
        .catch(function(err) {
            console.log(err);
        });

    };

    
    /* Utilities */
    //  Utility to make a table from aset of data ( an array of arrays )
    //  https://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
    function makeTable(container, data) {
        var table = $("<table/>").addClass('table table-striped');
        $.each(data, function (rowIndex, r) {

            var row = $("<tr/>");
            $.each(r, function (colIndex, c) {
                row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
            });
            table.append(row);
        });
        return container.html(table);
    }

    //  Utility to take a response filled with idioms and make it into an array of arrays that is in a format ready for our "makeTable" utility.
    function prepareResponseForTable(response) {
        var data = [];
        data[0] = ["idiom"]; // Row header ( Add more columns if needed )

        response.forEach(function (eachIdiom) {
            //   data.push([eachIdiom._id, eachIdiom.idiom, eachIdiom.link, eachIdiom._v]);
            data.push([eachIdiom.idiom]);
        });

        return data; // Returns an array of arrays for "makeTable"
    }



    /* Event Listeners */
    $scrapeButton.on("click", handleScrapeSubmit);
    $searchButton.on("click", handleSearchSubmit);
    $getAllButton.on("click", handleGetAll);
});