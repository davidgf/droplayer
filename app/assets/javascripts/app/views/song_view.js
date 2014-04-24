var SongView = Backbone.View.extend({
  tagName: 'li',
  songTemplate: _.template(SongArtistTemplate),
  events: {
    'click': 'addToPlaylist'
  },

  initialize: function(){
  },

  render: function(){
    this.$el.html(this.songTemplate({song: this.model.toJSON()}));
    return this;
  },

  addToPlaylist: function(){
    toastr['info']("Song added to queue");
    app.playlist.addSong(this.model);
  }
});