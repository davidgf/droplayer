define(['jquery', 'backbone', 'underscore', 'models/song'], function($, Backbone, _, Song) {

    var Songs = Backbone.Collection.extend({
        model: Song
    });
    
    return Songs;
})