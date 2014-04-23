var PlaylistView = Backbone.View.extend({
  el: '#playlist',
  songTemplate: _.template(SongArtistTemplate),
  events: {
  },

  initialize: function(){
      app.playlist.get('songs').on('add', this.addOne, this );
      app.playlist.get('songs').on('reset', this.render, this );
      // app.playlist.on('change:currentSong', this.displaySong, this);
  },
  
  render: function(){
      var songs = app.playlist.get('songs');
      songs.each(this.addOne, this);
  },

  addOne: function(song){
    var songvw = new PlsongView({model: song});
    this.$el.append(songvw.render().el);
  },

  displaySong: function(song){
    console.log('song has been changed');
    console.log(song);
  }
});