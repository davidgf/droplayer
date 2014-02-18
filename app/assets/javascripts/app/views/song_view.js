define(['jquery', 'underscore', 'backbone'], function($, _ , Backbone){
  var SongView = Backbone.View.extend({
    tagName: 'li',
    songTemplate: _.template('<strong><% if(song.artist){ %>'+
        '<%= song.artist %> - <%= song.title %>'+
      '<% }else %>'+
        '<%= song.path %>'+
      '</strong>'),
    events: {
      'click': 'addToPlaylist'
    },

    initialize: function(){
        window.app.library.on('add', this.render, this );
        window.app.library.on('reset', this.render, this );
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
      app.playlist.get('songs').add(this.model);
    }
  });

  return SongView;
});