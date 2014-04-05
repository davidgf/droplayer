var ArtistView = Backbone.View.extend({
  tagName: 'li',
  className: 'color',
  artistTemplate: _.template('<strong class="artist_name"><%= artist_name %></strong>'),
  songsTemplate: _.template(GroupedSongsTemplate),
  events: {
    'click strong.artist_name': 'showSongs',
    'click .playall': 'playAll',
    'click .qeueall': 'qeueAll'
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
  },

  playAll: function(){
    app.playlist.playSongs();
  },

  qeueAll: function(){
    app.playlist.addSong(this.collection);
  }
});