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
      this.$el.append(this.songsTemplate({songs: _.sortBy(this.collection, function(song){ 
        var str = song.get('title') || song.get('path');
        return str.toLowerCase();
      })}));
    else
      songslist.toggle();
    return this;
  },

  playAll: function(){
    toastr['info']("Songs added to queue");
    app.playlist.reset(this.collection);
    app.playlist.setCurrent(app.playlist.getCurrent());
  },

  qeueAll: function(){
    toastr['info']("Songs added to queue");
    app.playlist.addSong(this.collection);
  }
});