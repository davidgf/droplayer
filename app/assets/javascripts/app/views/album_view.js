var AlbumView = Backbone.View.extend({
  tagName: 'li',
  albumTemplate: _.template('<% if(album != "null"){ %>'+
        '<strong><%= album %></strong><small><%= artist %></small>'+
      '<% } else { %>'+
        '<strong>Unknown</strong><small>Various</small>'+
      '<% } %>'
      ),
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
    var artist = this.collection[0].get('artist');
    this.$el.html(this.albumTemplate({album: this.attributes.album, artist: artist}));
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