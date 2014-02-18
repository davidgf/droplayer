define(['collections/songs'], function(Songs) {

    var Library = Backbone.Collection.extend({
        model: Song
    });
    
    return Library;
})