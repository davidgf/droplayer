var PlsongView = Backbone.View.extend({
  tagName: 'li',
  songTemplate: _.template(SongArtistTemplate),
  events: {
    'click': 'changeSong'
  },

  initialize: function(){
  },
  
  render: function(){
    this.$el.html(this.songTemplate({song: this.model.toJSON()}));
    return this;
  },

  changeSong: function(){
    var self = this;
    console.log('click '+this.model.get('path'))
    this.model.getMediaLink(function(data) {
      if (data && data.hasOwnProperty('url')){
        //$('audio').attr('src', data.url)
        app.playlist.trigger('playsong', [self.model, data.url]);
      }
    });
  }
});