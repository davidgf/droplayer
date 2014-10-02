var Controls = Backbone.View.extend({
  el: '#controls',

  playIconClass: 'play',
  pauseIconClass: 'pause',
  loadingIconClass: 'spinner',

  events: {
    'click .play_btn': 'playToggle',
    'click .next_song': 'playNext',
    'click .prev_song': 'playPrev'
  },

  initialize: function(){
    app.playlist.on('change:currentSong', this.playCurrent, this);
    this.$audio = this.$el.find('#myaudio');
    this.audio = this.$audio[0];
    this.$audio.on('loadstart', {status: 'loading'}, $.proxy(this.playingStatusChanged, this));
    this.$audio.on('playing', {status: 'playing'}, $.proxy(this.playingStatusChanged, this));
    this.$audio.on('pause', {status: 'paused'}, $.proxy(this.playingStatusChanged, this));
    this.$audio.on('ended', this.playNext);
    this.songLinkRequest = null;
  },

  playCurrent: function(){
    var currentSong = app.playlist.getCurrent();
    if(currentSong)
      this.play(currentSong);
  },

  play: function(song){
    if(song){
      var self = this;
      this.cancelRequest();
      self.audio.src = '';
      self.audio.play();
      this.togglePlayIcon('loading');
      this.songLinkRequest = song.getMediaLink(
        function(data) {
          if (data && data.hasOwnProperty('url')){
            self.audio.src = data.url;
          }
        },
        function(){
          self.togglePlayIcon('paused');
        },
        function(){
          self.songLinkRequest = null;
        }
      );
    }
  },

  cancelRequest: function(){
    if(this.songLinkRequest)
      this.songLinkRequest.abort();
  },

  playNext: function(){
    app.playlist.setNext();
  },

  playPrev: function(){
    app.playlist.setPrev();
  },

  playToggle: function() {
    if(this.audio.src){
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      var firstSong = app.playlist.getFirst();
      if(firstSong)
        app.playlist.setCurrent(firstSong);
    }
  },

  playingStatusChanged: function(e){
    var status = e.data.status;
    this.togglePlayIcon(status);
  },

  togglePlayIcon: function(status){
    var play_btn = this.$el.find('.play_btn');
    switch(status){
      case 'loading':
        play_btn.removeClass(this.playIconClass+' '+this.pauseIconClass).addClass(this.loadingIconClass);
        break;
      case 'playing':
        play_btn.removeClass(this.loadingIconClass+' '+this.playIconClass).addClass(this.pauseIconClass);
        break;
      case 'paused':
        play_btn.removeClass(this.loadingIconClass+' '+this.pauseIconClass).addClass(this.playIconClass);
        break;
    }
  },

  timeUpdate: function(){
    console.log('changed');
    // alert('yeah');
  }
});