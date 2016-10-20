module.exports = {

  properties: {

    /**
     * Override the initialize method if you need to save data for use
     * in other functions. This is especially useful if you have a nested
     * URL for an API endpoint, like /authors/:userId/books. In that case,
     * you can save the author here and refer to it when creating the URL
     * in the url() method.
     */

    // initialize: function(models, options) {
    //   return;
    // },

    /**
     * Override the url if your API endpoint does not match the default
     * conventions. For example, given a model named 'bookAuthor', and assuming
     * an apiRoot of 'http://localhost:1337' with pluralize set to true, the
     * endpoint for fetching the models is assumed to be 'http://localhost:1337/bookAuthors'
     * If this endpoint is on a different server (such as http://localhost:3001) or the
     * endpoint is named something different (such as book_authors or books/:id/authors)
     * you will need to set that here; the url can be either a string or a function
     */

    // url: function() {
    //   return 'https://api.example.com/endpoint'
    // },

    /**
     * Override the parse method if you need to save metadata for the collection
     * or extract the data for the resources from a nested property (a common
     * occurrence when interacting with APIs that support pagination).
     */

    // parse: function(attributes) {
    //   this.meta = attributes.meta;
    //   return attributes.data;
    // },

    /**
     * Override the sync method if you need to control the AJAX communication. If you
     * override this method the library will make no AJAX requests for this collection.
     * Use of 'sync' refers to sync method provided by the 'lore-models' package,
     * i.e. require('lore-models').sync
     */

    // sync: function() {
    //   return sync.apply(this, arguments);
    // }

  }

};
