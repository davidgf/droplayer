var SongView = Backbone.View.extend({
  tagName: 'li',
  songTemplate: _.template(SongArtistTemplate),
  events: {
    'click': 'addToPlaylist'
  },

  initialize: function(){
      // window.app.library.on('add', this.render, this );
      // window.app.library.on('reset', this.render, this );
  },

  render: function(){
    this.$el.html(this.songTemplate({song: this.model.toJSON()}));
    return this;
  },

  changeSong: function(){
    this.model.getMediaLink(function(data) {
      if (data && data.hasOwnProperty('url'))
        $('audio').attr('src', data.url);
    });
  },

  addToPlaylist: function(){
    toastr['info']("Song added to queue");
    app.playlist.addSong(this.model);
  }
});