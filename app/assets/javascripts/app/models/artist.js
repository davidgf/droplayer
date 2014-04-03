var Artist = Backbone.RelationalModel.extend({
    relations: [
        {
            type: Backbone.HasMany, // Use the type, or the string 'HasOne' or 'HasMany'.
            key: 'artist_songs',
            relatedModel: 'Song',
            includeInJSON: Backbone.Model.prototype.idAttribute,
            collectionType: 'Songs',
            reverseRelation: {
                key: 'isPlayedBy'
            }
        }
    ],

    defaults: {
        "name": "Unknown"
    },

    initialize : function(attrs) {

    }
});