var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// creating new schema object;
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    imgLink: {
        type: String,
        required: false
    }
});

// creating the model from the Schema
var Article = mongoose.model("Article", ArticleSchema);

// export the model
module.exports = Article;