var ArtistsView = Backbone.View.extend({
  el: '#songs_by_artist',

  initialize: function(){
      // window.app.library.on('reset', this.render, this );
      window.app.library.on('add', this.render, this );
      this.render();
  },
  
  render: function(){
    this.$el.find('#artistslist').html('');
    var songs_by_artist = app.library.groupBy('artist');
    _.each(songs_by_artist, function(songs, artist){
      this.addArtist(artist, songs);
      // this.$('#artistslist').append('<li>'+artist+'</li>');
    }, this);
  },

  addArtist: function(artist, songs){
    var artist_view = new ArtistView({attributes: {'artist_name': artist}, collection: songs});
    this.$('#artistslist').append(artist_view.render().el);
  },

  fetchSongs: function(){
    window.app.library.fetch({remove:true});
  },

  timeUpdate: function(){
    console.log('changed');
  }
});
