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
    app.playlist.on('playsong',this.play,this);
    this.$audio = this.$el.find('#myaudio');
    this.audio = this.$audio[0];
    this.$audio.on('loadstart', {status: 'loading'}, $.proxy(this.togglePlayIcon, this));
    this.$audio.on('playing', {status: 'playing'}, $.proxy(this.togglePlayIcon, this));
    this.$audio.on('pause', {status: 'paused'}, $.proxy(this.togglePlayIcon, this));
  },

  play: function(song){
    if(song){
      var self = this;
      app.playlist.set('currentSong', song[0]);
      self.audio.src = song[1];
    }
  },

  playToggle: function() {
    if (this.audio.paused) {
      this.audio.play();
    } else{
      this.audio.pause();
    }
  },

  togglePlayIcon: function(e){
    var status = e.data.status;
    console.log(status);
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

  playNext: function(){
    console.log('next');
    var next = app.playlist.getNext();
    if(next){
      var self = this;
      app.playlist.set('currentSong', next);
      next.getMediaLink(function(data){
        if (data && data.hasOwnProperty('url'))
          self.$('audio').attr('src', data.url);
      });
    }
  },

  playPrev: function(){
    console.log('prev');
    var prev = app.playlist.getPrev();
    if(prev){
      var self = this;
      app.playlist.set('currentSong', prev);
      prev.getMediaLink(function(data){
        if (data && data.hasOwnProperty('url'))
          self.$('audio').attr('src', data.url);
      });
    }
  },

  timeUpdate: function(){
    console.log('changed');
    // alert('yeah');
  }
});