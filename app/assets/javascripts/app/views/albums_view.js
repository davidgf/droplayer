var AlbumsView = Backbone.View.extend({
  el: '#songs_by_album',

  initialize: function(){
      // window.app.library.on('reset', this.render, this );
      window.app.library.on('add', this.render, this );
      this.render();
  },
  
  render: function(){
    this.$el.find('#albumstslist').html('');
    var songs_by_album = app.library.groupBy('album');
    console.log(songs_by_album);
    _.each(songs_by_album, function(songs, album){
      this.addAlbum(album, songs);
    }, this);
  },

  addAlbum: function(album, songs){
    var album_view = new AlbumView({attributes: {'album': album}, collection: songs});
    this.$('#albumstslist').append(album_view.render().el);
  }
});
