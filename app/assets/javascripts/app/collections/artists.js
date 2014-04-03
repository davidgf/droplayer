var Artists = Backbone.Collection.extend({
    model: Artist,

    initialize: function(){
        window.app.library.on('add', this.addSong, this);
    },

    addSong: function(song) {
        var artist_name = song.get('artist');
        var artists = this.where({"name": artist_name});
        var artist = null;
        if(artists.length < 1){
            artist = new Artist({"name": artist_name});
            this.add(artist);
        } else
            artist = artists[0]
        song.set({'artist_model': artist});
    }
});