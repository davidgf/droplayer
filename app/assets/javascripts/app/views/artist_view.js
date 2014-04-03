var ArtistView = Backbone.View.extend({
  tagName: 'li',
  artistTemplate: _.template('<%= artist_name %>'),
  songsTemplate: _.template('<div class="songslist">'+
    '<% _.each(songs, function(song){ %>'+
      '<li><strong><%= song.get("title") || song.get("path") %></strong></li>'+
    '<% }); %>'+
    '</div>'),
  events: {
    'click': 'showSongs'
  },

  initialize: function(){
  },

  render: function(){
    this.$el.html(this.artistTemplate({artist_name: this.attributes.artist_name}));
    return this;
  },

  showSongs: function(){
    var songslist = this.$el.find('div.songslist');
    if(songslist.length == 0)
      this.$el.append(this.songsTemplate({songs: this.collection}));
    else
      songslist.toggle();
    return this;
  }
});