var Artists = Backbone.Collection.extend({
    model: Artist,

    initialize: function(){
        window.app.library.on('add', this.addSong, this);
    },

    addSong: function(song) {
        console.log('adding song');
        console.log(song);
    }
});