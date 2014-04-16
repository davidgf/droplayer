var MainView = Backbone.View.extend({
  el: '#library',
  songsTemplate: _.template('<% _.each(songs, function(song){ %><li><strong><%= song.path %></strong></li><% }); %>'),
  events: {
    'click #mybtn': 'fetchSongs'
  },

  initialize: function(){
      // window.app.library.on('reset', this.render, this );
      window.app.library.on('add', this.render, this );
      this.render();
  },
  
  render: function(){
    this.$el.find('#songslist').html('');
    var sorted_songs = app.library.sortBy(function(song){ var str = song.get('title') || song.get('path'); return str.toLowerCase(); });
    _.each(sorted_songs, this.addSong, this);
  },

  addSong: function(song){
    var songvw = new SongView({model: song});
    this.$('#songslist').append(songvw.render().el);
  },

  fetchSongs: function(){
    window.app.library.fetch({remove:true});
  }
});
