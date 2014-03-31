var MainView = Backbone.View.extend({
  el: '#main',
  //songsTemplate: _.template($('#songslisttpl').html()),
  songsTemplate: _.template('<% _.each(songs, function(song){ %><li><strong><%= song.path %></strong></li><% }); %>'),
  events: {
    'click #mybtn': 'fetchSongs',
    'timeupdate audio': 'timeUpdate'
  },

  initialize: function(){
      //window.app.collections.songs.on('add', this.render, this );
      window.app.library.on('reset', this.render, this );
  },
  
  render: function(){
    this.$el.find('#songslist').html('');
    app.library.each(this.addSong, this);
  },

  addSong: function(song){
    var songvw = new SongView({model: song});
    this.$('#songslist').append(songvw.render().el);
  },

  fetchSongs: function(){
    console.log('Fetching songs');
    window.app.library.fetch({validate:false});
  },

  timeUpdate: function(){
    console.log('changed');
  }
});
