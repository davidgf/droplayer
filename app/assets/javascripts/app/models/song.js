var Song = Backbone.Model.extend({
    defaults: {
        "artist_default": "Unknown",
        "album_default": "Unknown"
    },

    initialize : function() {

    },

    getMediaLink: function(callback){
    	$.ajax({
            url : '/songs/media_link',
            data : {
                path : this.get('path')
            },
            dataType : 'json',
            success : callback
        });
    },
    validate: function(attrs, options) {
        if (!attrs.mime_type) {
            return "the object is not an audio file";
        }
    }
});