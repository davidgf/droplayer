var AlbumView = Backbone.View.extend({
  tagName: 'li',
  albumTemplate: _.template('<span class="album_name"><% if(album != "null"){ %>'+
        '<strong><%= album %></strong><small><%= artist %></small>'+
      '<% } else { %>'+
        '<strong>Unknown</strong><small>Various</small>'+
      '<% } %></span>'
      ),
  songsTemplate: _.template(GroupedSongsTemplate),
  events: {
    'click span.album_name': 'showSongs',
    'click .playall': 'playAll',
    'click .qeueall': 'qeueAll'
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
  },

  playAll: function(){
    app.playlist.playSongs();
  },

  qeueAll: function(){
    app.playlist.addSong(this.collection);
  }
});