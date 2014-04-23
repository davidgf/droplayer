var PlsongView = Backbone.View.extend({
  tagName: 'li',
  songTemplate: _.template(SongArtistTemplate),
  events: {
    'click': 'playSong'
  },

  initialize: function(){
      app.playlist.on('change:currentSong', this.toggleActive, this);
  },
  
  render: function(){
    this.$el.html(this.songTemplate({song: this.model.toJSON()}));
    return this;
  },

  playSong: function(){
    app.playlist.setCurrent(this.model);
  },

  toggleActive: function(playlist){
    var currentSong = playlist.getCurrent();
    if(this.model == currentSong) {
      this.$el.addClass('now_playing');
    } else {
      this.$el.removeClass('now_playing');
    }
  }
});