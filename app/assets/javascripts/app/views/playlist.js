var PlaylistView = Backbone.View.extend({
  el: '#playlist',
  //songsTemplate: _.template($('#songslisttpl').html()),
  songTemplate: _.template('<li><strong><%= song.path %></strong></li>'),
  events: {
  },

  initialize: function(){
      console.log(app.playlist);
      window.app.playlist.get('songs').on('add', this.addOne, this );
  },
  
  render: function(){
    this.$el.html(this.songsTemplate({songs: window.app.collections.songs.toJSON()}));
  },

  addOne: function(song, songs){
    var songvw = new PlsongView({model: song});
    this.$el.append(songvw.render().el);
  }
});