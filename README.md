# Scraper

This is a web app that utilizes Mongoose and Cheerio to scrape news from another site. Users can also view and leave comments on the latest news articles.
   
Whenever a user visits the site, the app scrapes and displays stories from a news outlet. Each scraped article is saved to the application database. The following information are scraped and displayed for each article:

     * Headline - the title of the article
     * Summary - a short summary of the article
     * URL - the url to the original article
     * Possible additions (photos, bylines, etc).

Users can also leave comments on the articles which will be displayed and saved in the database. These can be revisited later or deleted if the user wishes.
  

## Packages used: 

   1. express
   2. express-handlebars
   3. mongoose
   4. cheerio
   5. axios
